const base = require('./rules/base');

module.exports = {
    extends: ['airbnb-base', 'prettier'],
    env: {
        browser: true,
        commonjs: true,
        es2022: true,
        node: true,
        jest: true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            globalReturn: false,
            impliedStrict: true,
        },
        requireConfigFile: false,
        allowImportExportEverywhere: false,
        babelOptions: {
            babelrc: false,
            configFile: false,
            presets: ['@babel/preset-env'],
        },
    },
    plugins: ['html', 'import', 'simple-import-sort'],
    rules: {
        ...base,
    },
};
