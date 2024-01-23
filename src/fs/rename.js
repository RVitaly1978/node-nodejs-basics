import { stat, rename as fsRename } from 'node:fs/promises';

import { getPath, throwError } from '../utils.js';

const rename = async () => {
    const srcFilePathSegments = ['files', 'wrongFilename.txt'];
    const destFilePathSegments = ['files', 'properFilename.md'];

    const srcFilePath = getPath(import.meta.url, srcFilePathSegments);
    const destFilePath = getPath(import.meta.url, destFilePathSegments);

    try {
        await stat(srcFilePath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throwError();
        } else {
            console.error(err);
            return;
        }
    }

    try {
        await stat(destFilePath);
        throwError();
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error(err);
            return;
        }
    }

    try {
        await fsRename(srcFilePath, destFilePath);
    } catch (err) {
        console.error(err);
    }
};

await rename();
