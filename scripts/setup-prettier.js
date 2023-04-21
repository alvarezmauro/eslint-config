const fs = require('fs');
const PrettyConsole = require('../lib/PrettyConsole');
const {
    PRETTIER_CONFIG,
    PROJECT_PRETTIER_CONFIG_PATH,
    PROJECT_PRETTIER_SAMPLE_CONFIG_PATH,
} = require('./consts');

/**
 * Function to setup prettier configuration
 *
 * @param {string} option - Selected option, can be 'override', 'merge', 'create', 'sample'
 */
function setupPrettier(option) {
    const prettyConsole = new PrettyConsole();
    prettyConsole.closeByNewLine = true;
    prettyConsole.useIcons = true;

    let projectPrettierConfig = {};

    if (option === 'override' || option === 'create') {
        fs.writeFileSync(
            PROJECT_PRETTIER_CONFIG_PATH,
            JSON.stringify(PRETTIER_CONFIG, null, 4),
        );
    } else if (option === 'merge') {
        try {
            projectPrettierConfig = JSON.parse(
                fs.readFileSync(PROJECT_PRETTIER_CONFIG_PATH),
            );
        } catch (err) {
            prettyConsole.print('red', '', '.prettierrc file not found');
            prettyConsole.print('blue', '', 'We will create a new one for you');
        }

        const mergedPrettierConfig = {
            ...PRETTIER_CONFIG,
            ...projectPrettierConfig,
        };

        fs.writeFileSync(
            PROJECT_PRETTIER_CONFIG_PATH,
            JSON.stringify(mergedPrettierConfig, null, 4),
        );
    } else if (option === 'sample') {
        fs.writeFileSync(
            PROJECT_PRETTIER_SAMPLE_CONFIG_PATH,
            JSON.stringify(PRETTIER_CONFIG, null, 4),
        );
    }
}

module.exports = setupPrettier;
