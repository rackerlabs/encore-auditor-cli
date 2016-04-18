'use strict';

const Auditor = require('./encore-auditor');
const BasicReporter = require('./basic-reporter');
const _ = require('lodash');
const util = require('util');

/**
 * @param {Commander} program Commander instance for cli help
 */
module.exports = function (program) {
    let options = program.opts();
    let config = require('../package.json').config;

    // Legacy audits are for deprecations in LTS block(s).
    let ltsAudits = require('./audits/blank'); // none for initial release
    // Current audits are for deprecations in current major block.
    let currentAudits = require('./audits/onedot');

    config.audits = [ ltsAudits, currentAudits ];

    if (program.debug) {
        console.log('OPTIONS:\n', util.inspect(options, { depth: null }));
        console.log('CONFIG:\n', util.inspect(config, { depth: null }));
        return;
    }

    // Custom Rules should be fixed AT EARLIEST CONVENIENCE
    //config.customRules = require(path_to_custom.json);

    let auditor = new Auditor(config);
    auditor.analyze().then((results) => {
        let reporter = new BasicReporter(results);
        reporter.report();
    }).catch((err) => {
        console.log('Something broke with the auditor.', err);
    });
};
