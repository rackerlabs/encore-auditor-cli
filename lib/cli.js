'use strict';

const _ = require('lodash');
const Auditor = require('./encore-auditor');
const util = require('util');

/**
 * @param {Commander} program Commander instance for cli help
 */
module.exports = function (program) {
    let options = program.opts();
    let config = require('../package.json').config;

    if (program.debug) {
        console.log('CONFIG:\n', util.inspect(config));
        console.log('OPTIONS:\n', util.inspect(options));
        return;
    }

    let auditor = new Auditor();
    auditor.analyze();
};
