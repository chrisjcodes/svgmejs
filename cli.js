#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const glob = require('glob');

const handleToJSON = (inputPath, outputPath) =>
    glob(`${inputPath}/*.svg`, (er, paths) => {
        const output = {};

        paths.map(pathName => {
            const filename = pathName
                .split('/')
                .pop()
                .replace('.svg', '');

            let data = fs.readFileSync(pathName, 'utf8');
            data = data.replace(/"/g, "'").replace(/\n/g, '');
            output[filename] = data;
        });

        fs.writeFileSync(`${outputPath}/output.json`, JSON.stringify(output));
    });

program
    .version('0.0.1', '-v, --version')
    .command('to-json <inputPath> <outputPath>')
    .action(handleToJSON);

program.parse(process.argv);
