module.exports = {
    "simple-import-sort/imports": [
        "error",
        {
            groups: [
                // Node.js builtins
                [
                    "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
                ],
                // Packages. `react` related packages come first
                ["^react", "^@?\\w"],
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
    "react/forbid-prop-types": "off",
    "react/no-unescaped-entities": "off",
    "react/function-component-definition": "off",
    "react/require-default-props": "off",
    "react/jsx-filename-extension": [
        "error",
        {
            extensions: [".js", ".jsx", ".mdx"],
        },
    ],
    "react/jsx-props-no-spreading": "off",
};
