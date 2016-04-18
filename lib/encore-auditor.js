'use strict'

const _ = require('lodash');
const glob = require('glob');
const util = require('util');
const fs = require('fs');

module.exports = class Auditor {
    constructor (config) {
        this.globs = config.globs;
        this.audits = config.audits;
        this.config = config;
    }

    // Start code analysis here!
    analyze() {
        return Promise.all([
            this.analysisOf('markup'),
            this.analysisOf('styles'),
            this.analysisOf('scripts'),
            this.analysisOf('tests')
        ]);
    }

    /**
     * @param {String} ilk
     * - `markup`
     * - `styles`
     * - `scripts`
     * - `tests`
     * @returns {Promise<Array>} Get array of results when promise resolves.
     */
    analysisOf(ilk) {
        let audits = this.audits;
        let promise = new Promise((resolve, reject) => {
            glob(this.globs[ilk], (err, paths) => {
                if (err) reject(err);

                let results = paths.reduce((allResults, path) => {
                    if (path.match(/bower_components|node_modules/)) {
                        return allResults;
                    }

                    let file = fs.readFileSync(path, 'utf8');

                    // iterate over Current and LTS audit signatures
                    audits.forEach((audit) => { // O(n)
                        let lineNo = 0;
                        file.split('\n').forEach((line) => { // O(n)
                            lineNo++;
                            audit.signatures[ilk].forEach((signature) => { // O(n)
                                if (line.match(signature.pattern)) {
                                    allResults.push({
                                        signature: signature,
                                        file: {
                                            path: path,
                                            line: line,
                                            lineNumber: lineNo
                                        }
                                    });
                                }
                            });
                        });
                    });

                    return allResults;
                }, []);//paths

                resolve(results);
            });//glob
        });//Promise()

        return promise;
    }//analysisOf(ilk)
}//Auditor
