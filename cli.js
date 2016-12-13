#!/usr/bin/env node
'use strict';

const program = require('commander');
const fronpress = require('./');

program
  .version('0.0.0')
  .option('-n, --new <name>', 'create a new project')
  .parse(process.argv);

if (program.new) {
  fronpress.new(program.new);
}
