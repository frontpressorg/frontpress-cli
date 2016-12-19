'use strict';

const fs = require('fs');
const childProcess = require('child_process');
const slugify = require('slug');
const inquirer = require('inquirer');
const questions = require('./questions');

const spawn = childProcess.spawn;
const exec = childProcess.exec;

function willReplacePath() {
  return inquirer.prompt(questions.replace);
}

function createPath(name) {
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
        return replace().then(res => res.replace ? resolve(createPath(name + 1)) : reject(Error(`Couldn't replace the path`)));
      }

      return resolve(createPath(name));
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
