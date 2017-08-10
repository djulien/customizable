#!/usr/bin/env node
//customizable test
'use strict';

require('../');
require('colors');
const other = require('./other.js');

console.log("top '%s'".blue_lt, global.top);

var which = other();
console.log((which == "custom")? "passed".green_lt: "failed".red_lt);

//for this to work, create a symlink:  cd node_modules; ln -s .. TOP
//const found = require('TOP/test/other.js');
//console.log(found? "found".green_lt: "!found".red_lt);

//eof
