'use strict';

const _ = require('lodash');
const chalk = require('chalk');
const util = require('util');

function normalizeMessage (msg) {
    return msg
        .replace(/(\r\n|\r|\n)/, ' ')
        .replace(/\s{2,}/, ' ');
}//normalizeMessage()

function formattedMessage (result) {
    let fmt;
    let msg = result.signature.level;

    switch(result.signature.level) {
        case 'error':
            // white on red
            fmt = chalk.bold.white.bgRed;
            break;
        case 'info':
            // white on blue
            fmt = chalk.bold.white.bgBlue;
            break;
        default:
            msg = 'warning';
            // black on yellow
            fmt = chalk.bold.black.bgYellow;
            break;
    }

    return fmt(msg.toUpperCase());
}//formattedMessage()

module.exports = class BasicReporter {
    constructor(results) {
        this.results = _.flatten(results);
    }

    report() {
        this.results.forEach((result) => {
            [
                [
                    formattedMessage(result),
                    chalk.bold(`${result.file.path}:${result.file.lineNumber}:${result.file.line}`)
                ].join(' '),
                result.signature.messages.map(normalizeMessage).join('\n'),
                '', // empty line
            ].forEach((m) => console.log(m));
        });
    }
};//BasicReporter
