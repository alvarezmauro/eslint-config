#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const PrettyConsole = require('../lib/prettyConsole');
const ESLINT_CONFIG = require('../.eslintrc.sample.js');
const BASE_ESLINT_CONFIG = require('../base.js');
const REACT_ESLINT_CONFIG = require('../react.js');
const TYPESCRIPT_ESLINT_CONFIG = require('../typescript.js');
const REACT_TYPESCRIPT_ESLINT_CONFIG = require('../react-typescript.js');

const PROJECT_ESLINT_CONFIG_PATH = path.resolve(process.cwd(), '.eslintrc');
const PROJECT_ESLINT_SAMPLE_CONFIG_PATH = path.resolve(
    process.cwd(),
    '.eslintrc.sample',
);

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
            prettyConsole.error('.prettierrc file not found');
            prettyConsole.info('We will create a new one for you');
        }

        if (eslintConfigExists) {
            const extendsToFilter = [...CONFIG.extends, EXTENDS];
            extendsValue = projectEslintConfig.extends.filter((value) => {
                return extendsToFilter.indexOf(value) === -1;
            });
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
            JSON.stringify(ESLINT_CONFIG, _PATH.js, 4),
        );
    }
}

module.exports = setupEslint;
