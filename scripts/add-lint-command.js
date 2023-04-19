const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const PROJECT_PACKAGE_JSON_PATH = path.resolve(process.cwd(), 'package.json');

async function addLintCommand() {
    const { addLintCommand } = await inquirer.prompt([
        {
            type: 'list',
            name: 'addLintCommand',
            message: 'Do you want to add a lint command to your package.json?',
            choices: [
                { name: 'Yes', value: true },
                { name: 'No', value: false },
            ],
        },
    ]);

    if (!addLintCommand) {
        return;
    }

    const hostPackageJson = require(PROJECT_PACKAGE_JSON_PATH);
    hostPackageJson.scripts = {
        ...hostPackageJson.scripts,
        lint: 'eslint ./src',
    };

    fs.writeFileSync(
        PROJECT_PACKAGE_JSON_PATH,
        JSON.stringify(hostPackageJson, null, 4),
    );
}

module.exports = addLintCommand;
