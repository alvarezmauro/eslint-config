require("@rushstack/eslint-patch/modern-module-resolution");
const base = require("./rules/base.js");
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
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["simple-import-sort", "import", "tailwindcss"],
    rules: {
        ...base,
        ...react,
    },
    settings: {
        react: {
            // Tells eslint-plugin-react to automatically detect the version of React to use
            version: "detect",
        },
        "import/resolver": {
            alias: {
                map: [["src", "./src"]],
                extensions: [".js", ".jsx"],
            },
        },
    },
};
