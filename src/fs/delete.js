import { rm } from 'node:fs/promises';

import { getPath, throwError } from '../utils.js';

const remove = async () => {
    const filePathSegments = ['files', 'fileToRemove.txt'];

    const filePath = getPath(import.meta.url, filePathSegments);

    try {
        await rm(filePath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throwError();
        } else {
            console.error(err);
        }
    }
};

await remove();
