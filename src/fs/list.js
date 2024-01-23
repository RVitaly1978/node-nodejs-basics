import { readdir } from 'node:fs/promises';

import { getPath, throwError } from '../utils.js';

const list = async () => {
    const folderPathSegments = ['files'];

    const folderPath = getPath(import.meta.url, folderPathSegments);

    try {
        const files = await readdir(folderPath, { encoding: 'utf8' });
        console.log(files)
    } catch (err) {
        if (err.code === 'ENOENT') {
            throwError();
        } else {
            console.error(err);
        }
    }
};

await list();
