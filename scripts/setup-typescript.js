const fs = require('fs');
const {
    TYPESCRIPT_CONFIG,
    PROJECT_TYPESCRIPT_CONFIG_PATH,
    PROJECT_TYPESCRIPT_SAMPLE_CONFIG_PATH,
} = require('./consts');
const PrettyConsole = require('../lib/PrettyConsole');

/**
 * Function to setup TypeScript configuration
 *
 * @param {string} option - Selected option, can be 'override', 'merge', 'create', 'sample'
 */
function updateTsconfig(option) {
    const prettyConsole = new PrettyConsole();
    prettyConsole.closeByNewLine = true;
    prettyConsole.useIcons = true;

    let projectTsConfig = {};

    if (option === 'override' || option === 'create') {
        fs.writeFileSync(
            PROJECT_TYPESCRIPT_CONFIG_PATH,
            JSON.stringify(TYPESCRIPT_CONFIG, null, 4),
        );
    } else if (option === 'merge') {
        try {
            projectTsConfig = JSON.parse(
                fs.readFileSync(PROJECT_TYPESCRIPT_CONFIG_PATH),
            );
        } catch (err) {
            prettyConsole.print('red', '', 'tsconfig.json file not found');
            prettyConsole.print('blue', '', 'We will create a new one for you');
        }

        const mergedTsConfig = {
            ...TYPESCRIPT_CONFIG,
            ...projectTsConfig,
        };

        fs.writeFileSync(
            PROJECT_TYPESCRIPT_CONFIG_PATH,
            JSON.stringify(mergedTsConfig, null, 4),
        );
    } else if (option === 'sample') {
        fs.writeFileSync(
            PROJECT_TYPESCRIPT_SAMPLE_CONFIG_PATH,
            JSON.stringify(TYPESCRIPT_CONFIG, null, 4),
        );
    }
}

module.exports = updateTsconfig;
