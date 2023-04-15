#!/usr/bin/env node
const fs = require('fs');
const PrettyConsole = require('../lib/prettyConsole');
const PRETTIER_CONFIG = require('../.prettierrc.js');

const PROJECT_PRETTIER_CONFIG_PATH = `${process.cwd()}/.prettierrc`;
const PROJECT_PRETTIER_SAMPLE_CONFIG_PATH = `${process.cwd()}/.prettierrc.sample`;

/**
 * Function to setup prettier configuration
 *
 * @param {string} option - Selected option, can be 'override', 'merge', 'create', 'sample'
 */
function setupPrettier(option) {
    const prettyConsole = new PrettyConsole();
    prettyConsole.closeByNewLine = true;
    prettyConsole.useIcons = true;

    let prettierConfigExists = false;
    let projectPrettierConfig = {};

    if (option === 'override' || option === 'create') {
        fs.writeFileSync(
            PROJECT_PRETTIER_CONFIG_PATH,
            JSON.stringify(PRETTIER_CONFIG, null, 4),
        );
    } else if (option === 'merge') {
        try {
            projectPrettierConfig = JSON.parse(
                fs.readFileSync(PROJECT_PRETTIER_CONFIG_PATH),
            );
            prettierConfigExists = true;
        } catch (err) {
            prettyConsole.error('.prettierrc file not found');
            prettyConsole.info('We will create a new one for you');
        }

        const mergedPrettierConfig = {
            ...PRETTIER_CONFIG,
            ...projectPrettierConfig,
        };

        fs.writeFileSync(
            PROJECT_PRETTIER_CONFIG_PATH,
            JSON.stringify(mergedPrettierConfig, null, 4),
        );
    } else if (option === 'sample') {
        fs.writeFileSync(
            PROJECT_PRETTIER_SAMPLE_CONFIG_PATH,
            JSON.stringify(PRETTIER_CONFIG, null, 4),
        );
    }
}

module.exports = setupPrettier;
