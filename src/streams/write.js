import { createWriteStream } from 'node:fs';
import * as readline from 'node:readline';
import { EOL } from 'node:os';

import { getPath } from '../utils.js';

const usageText = `Usage:
    - Type the content and press Enter
    - Press Enter on an empty line to exit the program
`;

const write = async () => {
    const filePath = getPath(import.meta.url, ['files', 'fileToWrite.txt']);

    const writableStream = createWriteStream(filePath)
        .on('error', (error) => {
            console.error(error);
            process.exit(1);
        })
        .on('finish', () => {
            process.exit(0);
        });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> ',
    })
        .on('line', (line) => {
            if (!line || !line.trim()) {
                rl.close();
            } else {
                writableStream.write(line + EOL);
                rl.prompt();
            }
        })
        .on('close', () => {
            writableStream.end();
        });

    console.log(usageText);

    rl.prompt();
};

await write();
