const fs = require('fs');
const inquirer = require('inquirer');
const PrettyConsole = require('../lib/PrettyConsole');

const {
    PROJECT_VSCODE_FOLDER_PATH,
    PROJECT_VSCODE_SETTINGS_PATH,
} = require('./consts');

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
                'Do you want to add the recommended VSCode settings for ESLint and Prettier to your project ".vscode/settings.json?"',
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
    if (fs.existsSync(PROJECT_VSCODE_SETTINGS_PATH)) {
        // Read the file and parse its contents as JSON
        const vscodeSettings = JSON.parse(
            fs.readFileSync(PROJECT_VSCODE_SETTINGS_PATH, 'utf8'),
        );

        // Merge the existing settings with the recommended settings
        const mergedSettings = {
            ...vscodeSettings,
            ...RECOMMENDED_SETTINGS,
        };

        // Write the JSON object to the file
        fs.writeFileSync(
            PROJECT_VSCODE_SETTINGS_PATH,
            JSON.stringify(mergedSettings, null, 4),
        );

        prettyConsole.print(
            'blue',
            '',
            'The ".vscode/settings.json" file has been updated with the recommended settings.',
        );
    } else {
        // Create a new .vscode/settings.json file with the recommended settings
        if (!fs.existsSync(PROJECT_VSCODE_FOLDER_PATH)) {
            fs.mkdirSync(PROJECT_VSCODE_FOLDER_PATH);
        }

        // Write the JSON object to the file
        fs.writeFileSync(
            PROJECT_VSCODE_SETTINGS_PATH,
            JSON.stringify(RECOMMENDED_SETTINGS, null, 4),
        );

        prettyConsole.print(
            'blue',
            '',
            'The ".vscode/settings.json" file has been created with the recommended settings.',
        );
    }
}

module.exports = addRecommendedVscodeSettings;
