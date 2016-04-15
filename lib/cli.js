'use strict';

const _ = require('lodash');
const Auditor = require('./encore-auditor');

/**
 * @param {Commander} program Commander instance for cli help
 */
module.exports = function (program) {
    let options = program.opts();
    let config = require('../package.json').config;

    if (program.debug) {
        console.log('PROGRAM CONFIG:');
        logObject(config, {indent: 1});

        console.log('PROGRAM OPTIONS:');
        logObject(options, {indent: 1});

        return;
    }

    // Test if it works
    let auditor = new Auditor();
    auditor.analyze();

    /**
     * @private
     */
    function logObject (obj, opts) {
        opts = opts || {};
        let indent = opts.indent || 0;
        let tab = '  '.repeat(indent);

        _.forOwn(obj, function (value, key) {
            if (_.isArray(value)) {
                console.log(`${tab}${key}: [ ${value.join(', ')} ]`);
            } else if (_.isObject(value)) {
                console.log(`${tab}${key}:`);
                logObject(value, {indent: indent+1});
            } else {
                console.log(`${tab}${key}: ${value}`);
            }
        });
    }//logObject
};
