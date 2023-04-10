require("@rushstack/eslint-patch/modern-module-resolution");
const base = require("./rules/base");
const prettier = require("./rules/prettier");

module.exports = {
    extends: ["airbnb-base", "prettier"],
    env: {
        browser: true,
        es2022: true,
        node: true,
        jest: true,
    },
    // parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: 13,
        sourceType: "module",
    },
    plugins: ["html", "prettier"],
    rules: {
        base,
        prettier,
    },
};
