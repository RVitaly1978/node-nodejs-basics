import { writeFile, stat } from 'node:fs/promises';

import { getPath, throwError } from '../utils.js';

const create = async () => {
    const fileContent = 'I am fresh and young';
    const filePath = getPath(import.meta.url, ['files', 'fresh.txt']);

    let isFileExist = false;

    try {
        await stat(filePath);
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
        await writeFile(filePath, fileContent);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

await create();
