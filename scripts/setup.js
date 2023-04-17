#!/usr/bin/env node
const fs = require('fs');
const inquirer = require('inquirer');
const shell = require('shelljs');
const PrettyConsole = require('../lib/prettyConsole');
const setupPrettier = require('./setup-prettier');
const setupTypescript = require('./setup-typescript');
const setupEslint = require('./setup-eslint');
const installDeps = require('./install-deps');

const prettyConsole = new PrettyConsole();
prettyConsole.clear();
prettyConsole.closeByNewLine = true;
prettyConsole.useIcons = true;

const PROJECT_PRETTIER_CONFIG_PATH = `${process.cwd()}/.prettierrc`;
const PROJECT_TS_CONFIG_PATH = `${process.cwd()}/tsconfig.json`;
const PROJECT_ESLINT_CONFIG_PATH = `${process.cwd()}/.eslintrc`;

function getTypeScriptConfigChoices() {
    let tsConfigExists;
    try {
        fs.readFileSync(PROJECT_TS_CONFIG_PATH);
        tsConfigExists = true;
    } catch (err) {
        tsConfigExists = false;
    }

    if (tsConfigExists) {
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

function getPrettierConfigChoices() {
    let prettierConfigExists;
    try {
        fs.readFileSync(PROJECT_PRETTIER_CONFIG_PATH);
        prettierConfigExists = true;
    } catch (err) {
        prettierConfigExists = false;
    }

    if (prettierConfigExists) {
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
        typeScript: '',
        esLint: '',
        prettier: '',
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

    // Prettier config
    const { prettierSelectedOption } = await inquirer.prompt([
        {
            type: 'list',
            name: 'prettierSelectedOption',
            message: 'What do you want to do with .prettierrc?',
            choices: getPrettierConfigChoices(),
        },
    ]);
    selectOptions.prettier = prettierSelectedOption;

    // Typescript config
    if (projectType === 'js-ts' || projectType === 'react-ts') {
        const { typeScriptSelectedOption } = await inquirer.prompt([
            {
                type: 'list',
                name: 'typeScriptSelectedOption',
                message: 'What do you want to do with tsconfig.json?',
                choices: getTypeScriptConfigChoices(),
            },
        ]);
        selectOptions.typeScript = typeScriptSelectedOption;
    }

    // ESLint config
    const { esLintSelectedOption } = await inquirer.prompt([
        {
            type: 'list',
            name: 'esLintSelectedOption',
            message: 'What do you want to do with eslintrc.js?',
            choices: getEsLintChoices(),
        },
    ]);
    selectOptions.esLint = esLintSelectedOption;

    setupPrettier(selectOptions.prettier);
    if (selectOptions.typeScript) {
        setupTypescript(selectOptions.typeScript);
    }
    setupEslint(selectOptions.esLint, selectOptions.projectType);

    installDeps(selectOptions.projectType);
}

const result = selectOptions();
