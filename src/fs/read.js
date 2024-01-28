import { readFile } from 'node:fs/promises';

import { getPath, throwError } from '../utils.js';

const read = async () => {
    const filePath = getPath(import.meta.url, ['files', 'fileToRead.txt']);

    try {
        const content = await readFile(filePath, { encoding: 'utf8' });
        console.log(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throwError();
        } else {
            console.error(err);
            process.exit(1);
        }
    }
};

await read();
