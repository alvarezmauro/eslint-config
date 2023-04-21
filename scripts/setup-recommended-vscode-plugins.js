const fs = require('fs');
const inquirer = require('inquirer');
const PrettyConsole = require('../lib/PrettyConsole');
const {
    PROJECT_VSCODE_FOLDER_PATH,
    PROJECT_VSCODE_EXTENSIONS_PATH,
} = require('./consts');

const REQUIRED_EXTENSIONS = [
    'esbenp.prettier-vscode',
    'dbaeumer.vscode-eslint',
];

async function addRecommendedVscodePlugins() {
    const prettyConsole = new PrettyConsole();
    prettyConsole.closeByNewLine = true;
    prettyConsole.useIcons = true;

    const { addRecommendedVscodePluginsPromptValue } = await inquirer.prompt([
        {
            type: 'list',
            name: 'addRecommendedVscodePluginsPromptValue',
            message:
                'Do you want to add recommended VSCode plugins to your project .vscode/extensions.json?',
            choices: [
                { name: 'Yes', value: true },
                { name: 'No', value: false },
            ],
        },
    ]);

    if (!addRecommendedVscodePluginsPromptValue) {
        return;
    }

    // Check if the .vscode/extensions.json file exists
    if (fs.existsSync(PROJECT_VSCODE_EXTENSIONS_PATH)) {
        // Read the file and parse its contents as JSON
        const vscodeExtensions = JSON.parse(
            fs.readFileSync(PROJECT_VSCODE_EXTENSIONS_PATH, 'utf8'),
        );

        // Check if the recommendations attribute exists and contains the required extensions
        if (
            vscodeExtensions.recommendations &&
            REQUIRED_EXTENSIONS.every((ext) =>
                vscodeExtensions.recommendations.includes(ext),
            )
        ) {
            prettyConsole.info(
                'The ".vscode/extensions.json" file already contains the recommended plugins',
                ...REQUIRED_EXTENSIONS.map((ext) => `  - ${ext}`),
            );
        } else {
            // Add the required extensions to the recommendations attribute
            if (!vscodeExtensions.recommendations) {
                vscodeExtensions.recommendations = [];
            }
            REQUIRED_EXTENSIONS.forEach((ext) => {
                if (!vscodeExtensions.recommendations.includes(ext)) {
                    vscodeExtensions.recommendations.push(ext);
                }
            });

            // Write the updated JSON object back to the file
            fs.writeFileSync(
                PROJECT_VSCODE_EXTENSIONS_PATH,
                JSON.stringify(vscodeExtensions, null, 4),
            );

            prettyConsole.info(
                'The ".vscode/extensions.json" file has been updated with the following plugins recommendations:',
                ...REQUIRED_EXTENSIONS.map((ext) => `  - ${ext}`),
            );

            prettyConsole.info(
                `The ".vscode/extensions.json" file has been updated with the following plugins recommendations: ${REQUIRED_EXTENSIONS.join(
                    ', ',
                )}`,
            );
        }
    } else {
        // Create a new .vscode/extensions.json file with the plugin recommendations
        const json = {
            recommendations: REQUIRED_EXTENSIONS,
            unwantedRecommendations: [],
        };

        if (!fs.existsSync(PROJECT_VSCODE_FOLDER_PATH)) {
            fs.mkdirSync(PROJECT_VSCODE_FOLDER_PATH);
        }

        // Write the JSON object to the file
        fs.writeFileSync(
            PROJECT_VSCODE_EXTENSIONS_PATH,
            JSON.stringify(json, null, 4),
        );
        prettyConsole.info(
            'The ".vscode/extensions.json" file has been created with the following recommendations:',
            ...REQUIRED_EXTENSIONS.map((ext) => `  - ${ext}`),
        );
    }
}

module.exports = addRecommendedVscodePlugins;
