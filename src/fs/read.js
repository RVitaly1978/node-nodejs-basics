import { readFile } from 'node:fs/promises';

import { getPath, throwError } from '../utils.js';

const read = async () => {
    const filePathSegments = ['files', 'fileToRead.txt'];

    const filePath = getPath(import.meta.url, filePathSegments);

    try {
        const content = await readFile(filePath, { encoding: 'utf8' });
        console.log(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throwError();
        } else {
            console.error(err);
        }
    }
};

await read();
