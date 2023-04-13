#!/usr/bin/env node
const fs = require('fs');
const prettierConfig = require('../.prettierrc.js');

function updatePrettierConfig() {
    let prettierConfigExists = false;
    const projectPrettierConfigPath = `${process.cwd()}/.prettierrc`;
    let projectPrettierConfig = {};

    try {
        projectPrettierConfig = JSON.parse(
            fs.readFileSync(projectPrettierConfigPath),
        );
        prettierConfigExists = true;
    } catch (err) {
        console.log(`.prettierrc file not found`);
    }

    const mergedPrettierConfig = {
        ...prettierConfig,
        ...projectPrettierConfig,
    };

    fs.writeFileSync(
        projectPrettierConfigPath,
        JSON.stringify(mergedPrettierConfig, null, 4),
    );

    console.log(`${prettierConfigExists ? 'Updated' : 'Created'} .prettierrc`);
}

updatePrettierConfig();
