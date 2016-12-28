#!/usr/bin/env node
'use strict';

const project = require('commander');
const inquirer = require('inquirer');

const app = require('./app');
const questions = require('./app/questions');

project
  .version('0.0.0')
  .option('-n, --new <name>', 'create a new project')
  .option('-i, --init', 'init the project')
  .parse(process.argv);

if (project.new) {
  app.checkNameIsUnique(project.new)
    .then(isUnique => {
      if (isUnique) {
        app.new(project.new);
        process.exit();
      }

      return askWillReplacePath();
    })
    .then(answer => {
      if (answer.replace) {
        return app.new(project.new);
      }

      throw new Error(`Couldn't create the project path. Please, try again.`);
    })
    .catch(err => console.log(err.message));
}

if (project.init) {
  inquirer
    .prompt(questions.init)
    .then(answers => app.init(answers));
}

function askWillReplacePath() {
  return inquirer.prompt(questions.replaceProject);
}
