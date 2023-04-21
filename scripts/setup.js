#!/usr/bin/env node
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const PrettyConsole = require('../lib/PrettyConsole');
const setupPrettier = require('./setup-prettier');
const setupTypescript = require('./setup-typescript');
const setupEslint = require('./setup-eslint');
const installDeps = require('./install-deps');
const addLintCommand = require('./add-lint-command');
const addVsCodeSettings = require('./add-recommended-vscode-plugins');

const PROJECT_PRETTIER_CONFIG_PATH = path.resolve(process.cwd(), '.prettierrc');
const PROJECT_TS_CONFIG_PATH = path.resolve(process.cwd(), '.tsconfig.json');
const PROJECT_ESLINT_CONFIG_PATH = path.resolve(process.cwd(), '.eslintrc');

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

async function setup() {
    const selectOptions = {
        projectType: '',
        typeScript: '',
        esLint: '',
        prettier: '',
    };

    const prettyConsole = new PrettyConsole();
    prettyConsole.clear();
    prettyConsole.closeByNewLine = true;
    prettyConsole.useIcons = true;

    prettyConsole.print('blue', '', '----------------------------------------');
    prettyConsole.info(
        'This package will help you to setup Prettier, ESLint and TypeScript',
        'based on the type of project you choose from a list (JS, JS+TS, React, React+TS).',
        '',
        'It will also help you to:',
        '- Install the required dependencies for ESLint, Prettier and TypeScript.',
        '- Add a "lint" command to your package.json.',
        '- Add recommended VSCode plugins to your workspace settings.',
        '- Add recommended VSCode settings for ESLint and Prettier to your workspace.',
        '',
        'Have in mind that:',
        `- If you don't have any of the required configuration files, we will create them for you.`,
        '- If you already have any of the required configuration files, we will ask you if',
        '   you want to override them or merge them with our recommended configuration.',
        '- If you want to keep your existing configuration files, you can save our recommended',
        '  configuration in a separate file.',
    );
    prettyConsole.print('blue', '', '----------------------------------------');

    const { projectTypePromptValue } = await inquirer.prompt([
        {
            type: 'list',
            name: 'projectTypePromptValue',
            message: 'What type of project would you like to set up?',
            choices: [
                { name: 'Javascript', value: 'js' },
                { name: 'Javascript + TypeScript', value: 'js-ts' },
                { name: 'React', value: 'react' },
                { name: 'React + TypeScript', value: 'react-ts' },
            ],
        },
    ]);
    selectOptions.projectType = projectTypePromptValue;

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
    if (
        projectTypePromptValue === 'js-ts' ||
        projectTypePromptValue === 'react-ts'
    ) {
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

    await installDeps(selectOptions.projectType);

    await addLintCommand();

    await addVsCodeSettings();
}

module.exports = setup;
