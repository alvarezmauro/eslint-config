const { execSync } = require('child_process');
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

function installDeps(projectType) {
    const prettyConsole = new PrettyConsole();
    prettyConsole.closeByNewLine = true;
    prettyConsole.useIcons = true;

    REQUIRED_PACKAGES[projectType].forEach((package) => {
        prettyConsole.info('Installing necessary dependencies...');

        try {
            // Check if the required package is already installed
            require.resolve(package.name);
            // Check if the installed version is compatible
            const packageJson = require(`${process.cwd()}/package.json`);
            const installedVersion = packageJson.devDependencies[package.name];

            if (
                !installedVersion ||
                !semver.satisfies(installedVersion, package.version)
            ) {
                // The installed version is incompatible, so log an error
                prettyConsole.error(
                    `Error: The installed version of ${package.name} (${installedVersion}) is not compatible with ${package.version}`,
                );
            }
        } catch (error) {
            // The package is not installed, so install it as a devDependency
            prettyConsole.info(
                `Installing ${package.name}@${package.version}...`,
            );
            execSync(
                `npm install --save-dev ${package.name}@${package.version}`,
                {
                    stdio: 'inherit',
                },
            );
        }
    });
}

module.exports = installDeps;
