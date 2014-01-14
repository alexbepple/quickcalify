#!/usr/bin/env node

var translate = require('./quickcal').translate;
console.log(translate(process.argv[2]));
