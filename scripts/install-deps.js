const { execSync } = require('child_process');
const inquirer = require('inquirer');
const semver = require('semver');
const PrettyConsole = require('../lib/prettyConsole');

const REQUIRED_PACKAGES = {
    ['js']: [
        { name: 'eslint-config-airbnb-base', version: '^15.0.0' },
        { name: '@babel/eslint-parser', version: '^7.21.3' },
        { name: '@babel/preset-env', version: '^7.21.4' },
    ],
    ['js-ts']: [
        { name: 'eslint-config-airbnb-base', version: '^15.0.0' },
        { name: 'eslint-config-airbnb-typescript', version: '^17.0.0' },
        { name: '@typescript-eslint/eslint-plugin', version: '^5.58.0' },
        { name: '@typescript-eslint/parser', version: '^5.58.0' },
    ],
    ['react']: [
        { name: 'eslint-config-airbnb', version: '^19.0.4' },
        { name: '@babel/eslint-parser', version: '^7.21.3' },
        { name: '@babel/preset-react', version: '^7.18.6' },
        { name: 'eslint-plugin-react', version: '^7.32.2' },
        { name: 'eslint-plugin-react-hooks', version: '^4.6.0' },
    ],
    ['react-ts']: [
        { name: 'eslint-config-airbnb', version: '^19.0.4' },
        { name: 'eslint-config-airbnb-typescript', version: '^17.0.0' },
        { name: '@typescript-eslint/eslint-plugin', version: '^5.58.0' },
        { name: '@typescript-eslint/parser', version: '^5.58.0' },
        { name: 'eslint-plugin-react', version: '^7.32.2' },
        { name: 'eslint-plugin-react-hooks', version: '^4.6.0' },
    ],
};

/**
 * Function to install the required dependencies
 *
 * @param {string} projectType
 */
async function installDeps(projectType) {
    const prettyConsole = new PrettyConsole();
    prettyConsole.closeByNewLine = false;
    prettyConsole.useIcons = true;

    let dependencyError = false;
    const packagesToInstall = [];

    console.log('');
    prettyConsole.print('blue', '', 'Checking installed dependencies...');
    REQUIRED_PACKAGES[projectType].forEach((package) => {
        try {
            // Check if the required package is already installed
            require.resolve(package.name);
            // Check if the installed version is compatible
            const packageJson = require(`${process.cwd()}/package.json`);
            const installedVersion = packageJson.devDependencies[package.name];

            if (installedVersion && installedVersion.startsWith('^')) {
                // Remove the ^ character from the installed version
                installedVersion = installedVersion.substring(1);
            }

            if (
                !installedVersion ||
                !semver.satisfies(installedVersion, package.version)
            ) {
                // The installed version is incompatible, so log an error
                prettyConsole.error(
                    `The installed version of ${package.name} (${installedVersion}) is not compatible with ${package.version}, please update it manually.`,
                );
                dependencyError = true;
            }
        } catch (error) {
            packagesToInstall.push(package);
        }
    });

    if (packagesToInstall.length > 0 && !dependencyError) {
        prettyConsole.print(
            'blue',
            '',
            '----------------------------------------',
        );
        prettyConsole.informationTitle = 'The following packages are required:';
        prettyConsole.info(
            ...packagesToInstall.map(
                (package) => `- ${package.name}@${package.version}`,
            ),
        );
        prettyConsole.print(
            'blue',
            '',
            '----------------------------------------',
        );

        const { installDepsPromptValue } = await inquirer.prompt([
            {
                type: 'list',
                name: 'installDepsPromptValue',
                message:
                    'Do you want to install them now? (if you choose "No", you will have to install them manually)',
                choices: [
                    { name: 'Yes', value: true },
                    { name: 'No', value: false },
                ],
            },
        ]);

        if (!installDepsPromptValue) {
            return;
        }

        const packages = packagesToInstall
            .map((package) => `${package.name}@${package.version}`)
            .join(' ');

        try {
            execSync(`npm install --save-dev ${packages}`, {
                stdio: 'inherit',
            });
        } catch (error) {
            prettyConsole.error(
                'There was an error installing the dependencies, please install them manually.',
            );
            dependencyError = true;
        }
    }
}

module.exports = installDeps;
