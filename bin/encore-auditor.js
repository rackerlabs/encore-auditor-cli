#!/usr/bin/env node
'use strict'

let cli = require('../lib/cli');
let program = require('commander');

program
    .version(require('../package.json').version)
    .usage('[options] <directory ...>')
    .description('A tool to analyze EncoreUI application source code for usage of deprecated features.')
    .option('--debug', 'Debug encore-auditor program')
    .parse(process.argv);

cli(program);
