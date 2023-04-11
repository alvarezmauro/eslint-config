require("@rushstack/eslint-patch/modern-module-resolution");
const base = require("./rules/base.js");
const prettier = require("./rules/prettier");
const react = require("./rules/react.js");

module.exports = {
    extends: ["airbnb", "airbnb/hooks", "prettier", "prettier/react"],
    env: {
        browser: true,
        commonjs: true,
        es2022: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["html", "prettier", "import", "simple-import-sort"],
    rules: {
        ...base,
        ...prettier,
        ...react,
    },
};
