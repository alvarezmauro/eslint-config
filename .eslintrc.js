require("@rushstack/eslint-patch/modern-module-resolution");

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
    rules: {},
    plugins: ["html", "prettier"],
};
