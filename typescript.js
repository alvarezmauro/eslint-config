const base = require('./rules/base.js');
const typescript = require('./rules/typescript.js');

module.exports = {
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    env: {
        browser: true,
        commonjs: true,
        es2022: true,
        node: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
    },
    plugins: ['html', 'import', 'simple-import-sort', '@typescript-eslint'],
    rules: {
        ...base,
        ...typescript,
    },
};
