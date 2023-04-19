const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

async function addLintCommands() {
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

    const hostPackageJsonPath = path.resolve(__dirname, '../../package.json');
    const hostPackageJson = JSON.parse(fs.readFileSync(hostPackageJsonPath));
    hostPackageJson.scripts = {
        ...hostPackageJson.scripts,
        lint: 'eslint ./src',
    };

    fs.writeFileSync(
        hostPackageJsonPath,
        JSON.stringify(hostPackageJson, null, 4),
    );
}
