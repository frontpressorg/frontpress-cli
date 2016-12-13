'use strict';

const spawn = require('child_process').spawn;

module.exports.new = name => spawn('mkdir', [name]);
