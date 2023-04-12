const base = require('./rules/base.js');
const react = require('./rules/react.js');
const reactTypescript = require('./rules/react-typescript.js');
const typescript = require('./rules/typescript.js');

module.exports = {
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/react',
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
        ...react,
        ...typescript,
    },
};
