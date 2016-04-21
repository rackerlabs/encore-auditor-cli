'use strict';

const _ = require('lodash');
const chalk = require('chalk');
const util = require('util');

function normalizeMessage (msg) {
    return msg
        .replace(/(\r\n|\r|\n)/, ' ')
        .replace(/\s{2,}/, ' ');
}

module.exports = class BasicReporter {
    constructor(results) {
        this.results = _.flatten(results);
    }

    report() {
        this.results.forEach((result) => {
            [
                chalk.bold(`${result.file.path}:${result.file.lineNumber}:${result.file.line}`),
                result.signature.messages.map(normalizeMessage).join('\n'),
                '', // empty line for readability
            ].forEach((m) => console.log(m));
        });
    }
};//BasicReporter
