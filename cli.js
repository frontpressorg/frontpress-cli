#!/usr/bin/env node
'use strict';

const program = require('commander');
const inquirer = require('inquirer');
const frontpress = require('./app');
const questions = require('./app/questions');

program
  .version('0.0.0')
  .option('-n, --new <name>', 'create a new project')
  .option('-i, --init', 'init the project')
  .parse(process.argv);

if (program.new) {
  frontpress.new(program.new);
}

if (program.init) {
  inquirer
    .prompt(questions.init)
    .then(answers => frontpress.init(answers));
}
