#!/usr/bin/env node
const fs = require('fs');
const {
    PROJECT_ESLINT_CONFIG_PATH,
    PROJECT_ESLINT_SAMPLE_CONFIG_PATH,
    ESLINT_CONFIG,
    BASE_ESLINT_CONFIG,
    REACT_ESLINT_CONFIG,
    TYPESCRIPT_ESLINT_CONFIG,
    REACT_TYPESCRIPT_ESLINT_CONFIG,
} = require('./consts');

const PrettyConsole = require('../lib/PrettyConsole');

/**
 * Function to setup ESlint configuration
 *
 * @param {string} option - Selected option, can be 'override', 'merge', 'create', 'sample'
 * @param {string} projectType - Project type, can be 'js', 'react', 'js-ts', 'react-ts'
 */
function setupEslint(option, projectType) {
    const prettyConsole = new PrettyConsole();
    prettyConsole.closeByNewLine = true;
    prettyConsole.useIcons = true;

    let eslintConfigExists = false;
    let projectEslintConfig = {};

    let CONFIG;
    let EXTENDS;

    switch (projectType) {
        case 'js':
            CONFIG = BASE_ESLINT_CONFIG;
            EXTENDS = '@alvarezmauro/eslint-config';
            break;
        case 'react':
            CONFIG = REACT_ESLINT_CONFIG;
            EXTENDS = '@alvarezmauro/eslint-config/react';
            break;
        case 'js-ts':
            CONFIG = TYPESCRIPT_ESLINT_CONFIG;
            EXTENDS = '@alvarezmauro/eslint-config/typescript';
            break;
        case 'react-ts':
            CONFIG = REACT_TYPESCRIPT_ESLINT_CONFIG;
            EXTENDS = '@alvarezmauro/eslint-config/react-typescript';
            break;
        default:
            break;
    }

    if (option === 'override' || option === 'create') {
        ESLINT_CONFIG.extends = [EXTENDS];
        fs.writeFileSync(
            PROJECT_ESLINT_CONFIG_PATH,
            JSON.stringify(ESLINT_CONFIG, null, 4),
        );
    } else if (option === 'merge') {
        let extendsValue = [];
        try {
            projectEslintConfig = JSON.parse(
                fs.readFileSync(PROJECT_ESLINT_CONFIG_PATH),
            );
            eslintConfigExists = true;
        } catch (err) {
            prettyConsole.error('.eslintrc file not found');
            prettyConsole.info('We will create a new one for you');
        }

        if (eslintConfigExists) {
            /**
             * Check if any of the extend values from CONFIG.extends and EXTENDS are
             * already in the project's .eslintrc file. If so, remove them from the
             * "extendsValue" array to avoid duplicates.
             * */
            const extendsToFilter = [...CONFIG.extends, EXTENDS];
            extendsValue = projectEslintConfig.extends.filter(
                (value) => extendsToFilter.indexOf(value) === -1,
            );
        }

        extendsValue.unshift(EXTENDS);

        const mergedPrettierConfig = {
            ...ESLINT_CONFIG,
            ...projectEslintConfig,
            extends: extendsValue,
        };

        fs.writeFileSync(
            PROJECT_ESLINT_CONFIG_PATH,
            JSON.stringify(mergedPrettierConfig, null, 4),
        );
    } else if (option === 'sample') {
        ESLINT_CONFIG.extends = [EXTENDS];
        fs.writeFileSync(
            PROJECT_ESLINT_SAMPLE_CONFIG_PATH,
            JSON.stringify(ESLINT_CONFIG, null, 4),
        );
    }
}

module.exports = setupEslint;
