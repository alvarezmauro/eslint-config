/* eslint-disable no-console */
const fs = require('fs');
const inquirer = require('inquirer');

const { PROJECT_PACKAGE_JSON_PATH, PROJECT_PACKAGE_JSON } = require('./consts');

async function addLintCommand() {
    console.log('');
    const { addLintCommandPromptValue } = await inquirer.prompt([
        {
            type: 'list',
            name: 'addLintCommandPromptValue',
            message:
                'Do you want to add a "lint" command to your package.json?',
            choices: [
                { name: 'Yes', value: true },
                { name: 'No', value: false },
            ],
        },
    ]);

    if (!addLintCommandPromptValue) {
        return;
    }

    PROJECT_PACKAGE_JSON.scripts = {
        ...PROJECT_PACKAGE_JSON.scripts,
        lint: 'eslint ./src',
    };

    fs.writeFileSync(
        PROJECT_PACKAGE_JSON_PATH,
        JSON.stringify(PROJECT_PACKAGE_JSON, null, 4),
    );
}

module.exports = addLintCommand;
