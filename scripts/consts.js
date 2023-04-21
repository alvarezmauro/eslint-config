const fs = require('fs');
const path = require('path');

const BASE_ESLINT_CONFIG = require('../base.js');
const REACT_ESLINT_CONFIG = require('../react.js');
const TYPESCRIPT_ESLINT_CONFIG = require('../typescript.js');
const REACT_TYPESCRIPT_ESLINT_CONFIG = require('../react-typescript.js');

const PROJECT_PRETTIER_CONFIG_PATH = path.resolve(process.cwd(), '.prettierrc');
const PROJECT_ESLINT_CONFIG_PATH = path.resolve(process.cwd(), '.eslintrc');
const PROJECT_ESLINT_SAMPLE_CONFIG_PATH = path.resolve(
    process.cwd(),
    '.eslintrc.sample',
);
const PROJECT_PRETTIER_SAMPLE_CONFIG_PATH = path.resolve(
    process.cwd(),
    '.prettierrc.sample',
);
const PROJECT_TYPESCRIPT_CONFIG_PATH = path.resolve(
    process.cwd(),
    'tsconfig.json',
);
const PROJECT_TYPESCRIPT_SAMPLE_CONFIG_PATH = path.resolve(
    process.cwd(),
    '.prettierrc.sample',
);
const PROJECT_PACKAGE_JSON_PATH = path.resolve(process.cwd(), 'package.json');
const PROJECT_PACKAGE_JSON = JSON.parse(
    fs.readFileSync(PROJECT_PACKAGE_JSON_PATH, 'utf8'),
);
const PROJECT_VSCODE_FOLDER_PATH = path.resolve(process.cwd(), '.vscode');
const PROJECT_VSCODE_EXTENSIONS_PATH = `${PROJECT_VSCODE_FOLDER_PATH}/extensions.json`;
const PROJECT_VSCODE_SETTINGS_PATH = `${PROJECT_VSCODE_FOLDER_PATH}/settings.json`;

const PRETTIER_CONFIG = JSON.parse(fs.readFileSync('../.prettierrc', 'utf8'));
const TYPESCRIPT_CONFIG = JSON.parse(
    fs.readFileSync('../tsconfig.json', 'utf8'),
);
const ESLINT_CONFIG = JSON.parse(
    fs.readFileSync('../.eslintrc.sample', 'utf8'),
);

module.exports = {
    BASE_ESLINT_CONFIG,
    REACT_ESLINT_CONFIG,
    TYPESCRIPT_ESLINT_CONFIG,
    REACT_TYPESCRIPT_ESLINT_CONFIG,
    PROJECT_ESLINT_CONFIG_PATH,
    PROJECT_ESLINT_SAMPLE_CONFIG_PATH,
    PROJECT_PRETTIER_CONFIG_PATH,
    PROJECT_PRETTIER_SAMPLE_CONFIG_PATH,
    PROJECT_TYPESCRIPT_CONFIG_PATH,
    PROJECT_TYPESCRIPT_SAMPLE_CONFIG_PATH,
    PROJECT_PACKAGE_JSON_PATH,
    PROJECT_PACKAGE_JSON,
    PROJECT_VSCODE_FOLDER_PATH,
    PROJECT_VSCODE_EXTENSIONS_PATH,
    PROJECT_VSCODE_SETTINGS_PATH,
    TYPESCRIPT_CONFIG,
    PRETTIER_CONFIG,
    ESLINT_CONFIG,
};
