module.exports = {
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "simple-import-sort/imports": [
        "error",
        {
            groups: [
                // Node.js builtins
                [
                    "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
                ],
                // Side effect imports
                ["^\\u0000"],
                // Internal packages
                ["^(src|internals)(/.*|$)"],
                // Parent imports. Put `..` last
                ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                // Other relative imports. Put same-folder imports and `.` last
                ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                // Style imports
                ["^.+\\.s?css$"],
            ],
        },
    ],
    "simple-import-sort/exports": "error",
    "no-underscore-dangle": "off",
    "no-unused-expressions": [
        "error",
        {
            allowTaggedTemplates: true,
            allowShortCircuit: true,
            allowTernary: true,
        },
    ],
    "consistent-return": "off",
    "max-nested-callbacks": ["error", 3],
    quotes: [
        "error",
        "single",
        {
            avoidEscape: true,
            allowTemplateLiterals: true,
        },
    ],
};
