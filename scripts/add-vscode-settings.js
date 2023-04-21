const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const PrettyConsole = require('../lib/PrettyConsole');

const VSCODE_FOLDER_PATH = path.resolve(process.cwd(), '.vscode');
const VSCODE_SETTINGS_PATH = `${VSCODE_FOLDER_PATH}/settings.json`;

const RECOMMENDED_SETTINGS = {
    'files.eol': '\n',
    'editor.tabSize': 4,
    'editor.formatOnSave': true,
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    '[json]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
    },
    '[jsonc]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
    },
    'editor.codeActionsOnSave': {
        'source.fixAll.eslint': true,
    },
};

async function addRecommendedVscodeSettings() {
    const prettyConsole = new PrettyConsole();
    prettyConsole.closeByNewLine = true;
    prettyConsole.useIcons = true;

    const { addRecommendedVscodeSettingsPromptValue } = await inquirer.prompt([
        {
            type: 'list',
            name: 'addRecommendedVscodeSettingsPromptValue',
            message:
                'Do you want to add recommended VSCode settings for esLint and Prettier to your project ".vscode/settings.json?"',
            choices: [
                { name: 'Yes', value: true },
                { name: 'No', value: false },
            ],
        },
    ]);

    if (!addRecommendedVscodeSettingsPromptValue) {
        return;
    }

    // Check if the .vscode/settings.json file exists
    if (fs.existsSync(VSCODE_SETTINGS_PATH)) {
        // Read the file and parse its contents as JSON
        const vscodeSettings = JSON.parse(
            fs.readFileSync(VSCODE_SETTINGS_PATH, 'utf8'),
        );

        // Merge the existing settings with the recommended settings
        const mergedSettings = {
            ...vscodeSettings,
            ...RECOMMENDED_SETTINGS,
        };

        // Write the JSON object to the file
        fs.writeFileSync(
            VSCODE_SETTINGS_PATH,
            JSON.stringify(mergedSettings, null, 4),
        );
        prettyConsole.info(
            'The ".vscode/settings.json" file has been updated with the recommended settings.',
        );
    } else {
        // Create a new .vscode/settings.json file with the recommended settings
        if (!fs.existsSync(VSCODE_FOLDER_PATH)) {
            fs.mkdirSync(VSCODE_FOLDER_PATH);
        }

        // Write the JSON object to the file
        fs.writeFileSync(
            VSCODE_SETTINGS_PATH,
            JSON.stringify(RECOMMENDED_SETTINGS, null, 4),
        );
        prettyConsole.info(
            'The ".vscode/settings.json" file has been created with the recommended settings.',
        );
    }
}

module.exports = addRecommendedVscodeSettings;
