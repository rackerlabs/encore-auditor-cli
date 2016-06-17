'use strict';

const Auditor = require('./encore-auditor');
const BasicReporter = require('./basic-reporter');
const _ = require('lodash');
const util = require('util');
const audits = require('./audits');

/**
 * @param {Commander} program Commander instance for cli help
 */
module.exports = function (program) {
    let options = program.opts();
    let config = require('../package.json').config;
    config.audits = audits;
    let auditor = new Auditor(config);

    if (program.debug) {
        console.log('OPTIONS:\n', util.inspect(options, { depth: null }));
        console.log('CONFIG:\n', util.inspect(config, { depth: null }));
        return;
    }

    auditor.analyze().then((results) => {
        let reporter = new BasicReporter(results);
        reporter.report();
    }).catch((err) => {
        console.log('Something broke with the auditor.', err);
    });
};
