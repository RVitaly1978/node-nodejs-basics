import { rm } from 'node:fs/promises';

import { getPath, throwError } from '../utils.js';

const remove = async () => {
    const filePath = getPath(import.meta.url, ['files', 'fileToRemove.txt']);

    try {
        await rm(filePath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throwError();
        } else {
            console.error(err);
            process.exit(1);
        }
    }
};

await remove();
