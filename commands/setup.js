#!/usr/bin/env node
const fs = require('fs');
const inquirer = require('inquirer');
const shell = require('shelljs');
const PrettyConsole = require('../lib/prettyConsole');

const prettyConsole = new PrettyConsole();
prettyConsole.clear();
prettyConsole.closeByNewLine = true;
prettyConsole.useIcons = true;

const PROJECT_TS_CONFIG_PATH = `${process.cwd()}/tsconfig.json`;
const PROJECT_ESLINT_CONFIG_PATH = `${process.cwd()}/eslintrc.js`;
const PROJECT_PRETTIER_CONFIG_PATH = `${process.cwd()}/.prettierrc`;

function getTsConfigChoices() {
    let hasTsConfig;
    try {
        fs.readFileSync(PROJECT_TS_CONFIG_PATH);
        hasTsConfig = true;
    } catch (err) {
        hasTsConfig = false;
    }

    if (hasTsConfig) {
        return [
            {
                name: 'Override tsconfig.json',
                value: 'override',
            },
            {
                name: 'Merge to existing tsconfig.json',
                value: 'merge',
            },
            {
                name: 'Save recommended configuration in tsconfig.sample.json',
                value: 'sample',
            },
        ];
    }

    return [
        {
            name: 'Create tsconfig.json',
            value: 'create',
        },
        {
            name: 'Save recommended configuration in tsconfig.sample.json',
            value: 'sample',
        },
    ];
}

function getPrettyConfigChoices() {
    let hasPrettyConfig;
    try {
        fs.readFileSync(PROJECT_PRETTIER_CONFIG_PATH);
        hasPrettyConfig = true;
    } catch (err) {
        hasPrettyConfig = false;
    }

    if (hasPrettyConfig) {
        return [
            {
                name: 'Override .prettierrc',
                value: 'override',
            },
            {
                name: 'Merge to existing .prettierrc',
                value: 'merge',
            },
            {
                name: 'Save recommended configuration in .prettierrc.sample',
                value: 'sample',
            },
        ];
    }

    return [
        {
            name: 'Create .prettierrc',
            value: 'create',
        },
        {
            name: 'Save recommended configuration in .prettierrc.sample',
            value: 'sample',
        },
    ];
}

function getEsLintChoices() {
    let hasEsLint;
    try {
        fs.readFileSync(PROJECT_ESLINT_CONFIG_PATH);
        hasEsLint = true;
    } catch (err) {
        hasEsLint = false;
    }

    if (hasEsLint) {
        return [
            {
                name: 'Override eslintrc.js',
                value: 'override',
            },
            {
                name: 'Merge to existing eslintrc.js',
                value: 'merge',
            },
            {
                name: 'Save recommended configuration in eslintrc.sample.js',
                value: 'sample',
            },
        ];
    }

    return [
        {
            name: 'Create eslintrc.js',
            value: 'create',
        },
        {
            name: 'Save recommended configuration in eslintrc.sample.js',
            value: 'sample',
        },
    ];
}

async function selectOptions() {
    const selectOptions = {
        projectType: '',
        tsConfig: '',
        esLint: '',
        prettyConfig: '',
    };

    prettyConsole.clear();
    const { projectType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'projectType',
            message: 'What type of project would you like to set up?',
            choices: [
                { name: 'Javascript', value: 'js' },
                { name: 'Javascript + TypeScript', value: 'js-ts' },
                { name: 'React', value: 'react' },
                { name: 'React + TypeScript', value: 'react-ts' },
            ],
        },
    ]);
    selectOptions.projectType = projectType;

    console.log('\n');
    prettyConsole.print('blue', '', '----------------------------------------');
    prettyConsole.info(
        'This package includes a recommended configuration for Prettier, TypeScript and ESLint.',
        'We will now ask you what you want to do with your existing configuration files.',
        '- If you do not have any configuration files, we will create them for you.',
        '- If you have existing configuration files, we will ask you if you want to override them or merge them with our recommended configuration.',
        '- If you want to keep your existing configuration files, you can save our recommended configuration in a separate file.',
    );
    prettyConsole.print('blue', '', '----------------------------------------');

    const { setupPrettier } = await inquirer.prompt([
        {
            type: 'list',
            name: 'setupPrettier',
            message: 'What do you want to do with .prettierrc?',
            choices: getPrettyConfigChoices(),
        },
    ]);
    selectOptions.prettyConfig = setupPrettier;

    if (projectType === 'js-ts' || projectType === 'react-ts') {
        const { setupTsConfig } = await inquirer.prompt([
            {
                type: 'list',
                name: 'setupTsConfig',
                message: 'What do you want to do with tsconfig.json?',
                choices: getTsConfigChoices(),
            },
        ]);
        selectOptions.tsConfig = setupTsConfig;
    }

    const { setupEsLint } = await inquirer.prompt([
        {
            type: 'list',
            name: 'setupEsLint',
            message: 'What do you want to do with eslintrc.js?',
            choices: getEsLintChoices(),
        },
    ]);
    selectOptions.esLint = setupEsLint;

    console.log(selectOptions);
    return selectOptions;
}

const result = selectOptions();
