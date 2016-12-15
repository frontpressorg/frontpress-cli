'use strict';

const fs = require('fs');
const childProcess = require('child_process');
const slugify = require('slug');
const inquirer = require('inquirer');

const spawn = childProcess.spawn;
const exec = childProcess.exec;

function willReplacePath() {
  const questions = [{
    type: 'confirm',
    name: 'replace',
    message: 'You alredy have a project with this name. Replace project?',
    default: false
  }];

  return inquirer.prompt(questions);
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
        return replace().then(res => res.replace ? resolve(createPath(name + 1)) : reject(false));
      }

      return resolve(createPath(name));
    });
  });
}

module.exports.new = newProject;
