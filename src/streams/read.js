import { createReadStream } from 'node:fs';
import { EOL } from 'node:os';

import { getPath } from '../utils.js';

const read = async () => {
    const filePath = getPath(import.meta.url, ['files', 'fileToRead.txt']);

    createReadStream(filePath, { encoding: 'utf8' })
        .on('error', (error) => {
            console.error(error);
            process.exit(1);
        })
        .on('data', (chunk) => {
            process.stdout.write(chunk + EOL);
        })
        .on('close', () => {
            process.exit(0);
        });
};

await read();
