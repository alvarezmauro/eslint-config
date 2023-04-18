const base = require('./rules/base.js');
const react = require('./rules/react.js');

module.exports = {
    extends: ['airbnb', 'airbnb/hooks', 'prettier'],
    env: {
        browser: true,
        commonjs: true,
        es2022: true,
        node: true,
        jest: true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-react'],
        },
    },
    plugins: ['html', 'import', 'simple-import-sort'],
    rules: {
        ...base,
        ...react,
    },
};
