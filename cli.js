#!/usr/bin/env node
'use strict';
const meow = require('meow');
const frontpressCli = require('./');

const cli = meow(`
  Usage
    $ frontpress-cli [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ frontpress-cli
    Lorem ipsum
`);

console.log(frontpressCli(cli.input[0] || ''));
