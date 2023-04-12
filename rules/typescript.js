module.exports = {
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    // This allows us to use async function on addEventListener(). Discussion: https://twitter.com/wesbos/status/1337074242161172486
    '@typescript-eslint/no-misused-promises': [
        'error',
        {
            checksVoidReturn: false,
        },
    ],
};
