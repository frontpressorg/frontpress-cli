#!/usr/bin/env node
'use strict';

const program = require('commander');
const frontpress = require('./');

program
  .version('0.0.0')
  .option('-n, --new <name>', 'create a new project')
  .parse(process.argv);

if (program.new) {
  frontpress.new(program.new);
}
