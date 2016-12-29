'use strict';

const fs = require('fs');
const childProcess = require('child_process');
const slugify = require('slug');

const spawn = childProcess.spawn;
const exec = childProcess.exec;

function checkNameIsUnique(name) {
  name = slugify(name);

  if (name === '') {
    throw new Error(`You need to provide a project name.`);
  }

  return new Promise(resolve => {
    fs.exists(name, exists => resolve(!exists));
  });
}

function newProject(name) {
  return {
    mkdir: spawn('mkdir', [name]),
    touch: spawn('touch', [`${name}/index.html`]),
    cd: exec('cd', [name])
  };
}

function init(answers) {
  const content = JSON.stringify(answers, null, 2);

  fs.writeFile('frontpress.json', content, error => {
    if (error) {
      throw error;
    }
  });
}

module.exports.new = newProject;
module.exports.init = init;
module.exports.checkNameIsUnique = checkNameIsUnique;
