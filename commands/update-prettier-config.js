#!/usr/bin/env node
const fs = require('fs');
const prettierConfig = require('../.prettierrc.js');

function updatePrettierConfig() {
    let prettierConfigExists = false;
    const prettierConfigPath = `${process.cwd()}/.prettierrc`;
    let projectPrettierConfig = {};

    try {
        projectPrettierConfig = JSON.parse(fs.readFileSync(prettierConfigPath));
        prettierConfigExists = true;
    } catch (err) {
        console.log(`.prettierrc file not found`);
    }

    const mergedPrettierConfig = {
        ...prettierConfig,
        ...projectPrettierConfig,
    };

    fs.writeFileSync(
        prettierConfigPath,
        JSON.stringify(mergedPrettierConfig, null, 4),
    );

    console.log(`${prettierConfigExists ? 'Updated' : 'Created'} .prettierrc`);
}

updatePrettierConfig();
