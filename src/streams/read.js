import { createReadStream } from 'node:fs';
import { EOL } from 'node:os';

import { getPath } from '../utils.js';

const read = async () => {
    const filePathSegments = ['files', 'fileToRead.txt'];
    const filePath = getPath(import.meta.url, filePathSegments);

    const readableStream = createReadStream(filePath, { encoding: 'utf8' });

    readableStream.on('error', (error) => {
        console.error(error);
    });

    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk + EOL);
    });

    readableStream.on('finish', () => {
        process.exit(0);
    });
};

await read();
