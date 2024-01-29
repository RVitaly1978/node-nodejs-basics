import { readdir } from 'node:fs/promises';

import { getPath, throwError } from '../utils.js';

const list = async () => {
    const folderPath = getPath(import.meta.url, ['files']);

    try {
        const files = await readdir(folderPath, { encoding: 'utf8' });
        console.log(files)
    } catch (err) {
        if (err.code === 'ENOENT') {
            throwError();
        } else {
            console.error(err);
            process.exit(1);
        }
    }
};

await list();
