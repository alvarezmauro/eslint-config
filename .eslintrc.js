require("@rushstack/eslint-patch/modern-module-resolution");
const base = require("./rules/base");
const prettier = require("./rules/prettier");

module.exports = {
    extends: ["airbnb-base", "prettier"],
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
    },
    plugins: ["html", "prettier", "import", "simple-import-sort"],
    rules: {
        base,
        prettier,
    },
};
