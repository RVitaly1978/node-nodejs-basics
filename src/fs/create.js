import { writeFile, stat } from 'node:fs/promises';

import { getPath, throwError } from '../utils.js';

const create = async () => {
    const filePathSegments = ['files', 'fresh.txt'];
    const fileContent = 'I am fresh and young';

    const filePath = getPath(import.meta.url, filePathSegments);

    let isFileExist = false;

    try {
        await stat(filePath);
        isFileExist = true;
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error(err);
            return;
        }
    }

    if (isFileExist) {
        throwError();
    }

    try {
        await writeFile(filePath, fileContent);
    } catch (err) {
        console.error(err);
    }
};

await create();
