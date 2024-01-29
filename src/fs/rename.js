import { stat, rename as fsRename } from 'node:fs/promises';

import { getPath, throwError } from '../utils.js';

const rename = async () => {
    const srcPath = getPath(import.meta.url, ['files', 'wrongFilename.txt']);
    const destPath = getPath(import.meta.url, ['files', 'properFilename.md']);

    let isFileExist = false;

    try {
        await stat(srcPath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throwError();
        } else {
            console.error(err);
            process.exit(1);
        }
    }

    try {
        await stat(destPath);
        isFileExist = true;
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error(err);
            process.exit(1);
        }
    }

    if (isFileExist) {
        throwError();
    }

    try {
        await fsRename(srcPath, destPath);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

await rename();
