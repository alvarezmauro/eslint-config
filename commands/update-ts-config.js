#!/usr/bin/env node
const fs = require('fs');
const tsConfig = require('../tsconfig.json');

function updateTsconfig() {
    let tsConfigExists = false;
    const projectTsConfigPath = `${process.cwd()}/.tsconfig.json`;
    let projectTsConfig = {};

    try {
        projectTsConfig = JSON.parse(fs.readFileSync(projectTsConfigPath));
        tsConfigExists = true;
    } catch (err) {
        console.log(`.tsconfig.json file not found`);
    }

    const mergedTsConfig = {
        ...tsConfig,
        ...projectTsConfig,
    };

    fs.writeFileSync(tsConfigPath, JSON.stringify(mergedTsConfig, null, 4));

    console.log(`${tsConfigExists ? 'Updated' : 'Created'} .tsconfig.json`);
}

updateTsconfig();
