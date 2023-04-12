const base = require('./rules/base.js');
const react = require('./rules/react.js');

module.exports = {
    extends: ['airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
    env: {
        browser: true,
        commonjs: true,
        es2022: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['html', 'import', 'simple-import-sort'],
    rules: {
        ...base,
        ...react,
    },
};
