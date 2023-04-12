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
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['html', 'import', 'simple-import-sort'],
    rules: {
        base,
    },
};
