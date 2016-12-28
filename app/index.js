'use strict';

const fs = require('fs');
const childProcess = require('child_process');
const slugify = require('slug');
const inquirer = require('inquirer');
const questions = require('./questions');

const spawn = childProcess.spawn;
const exec = childProcess.exec;

function willReplacePath() {
  return inquirer.prompt(questions.replaceProject);
}

function createProjectPath(name) {
  return {
    mkdir: spawn('mkdir', [name]),
    touch: spawn('touch', [`${name}/index.html`]),
    cd: exec('cd', [name])
  };
}

function newProject(name) {
  const replace = willReplacePath;

  return new Promise((resolve, reject) => {
    name = slugify(name);

    fs.exists(name, exists => {
      if (exists) {
        // TODO: improve tests for this.
        return replace().then(res => {
          if (res.replace) {
            return resolve(createProjectPath(name))
          }

          return reject(Error(`Couldn't replace the prjoect path`))
        });
      }

      return resolve(createProjectPath(name));
    });
  });
}

function init(answers) {
  const content = JSON.stringify(answers, null, 2);

  fs.writeFile('frontpress.json', content, err => {
    if (err) {
      throw err;
    }
  });
}

module.exports.new = newProject;
module.exports.init = init;
