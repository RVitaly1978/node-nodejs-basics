import { mkdir, readdir, copyFile, stat } from 'node:fs/promises';
import path from 'node:path';

import { getPath, throwError } from '../utils.js';

const copyItem = async (item, srcPath, destPath) => {
    const currItemPath = path.join(srcPath, item);
    const destItemPath = path.join(destPath, item);

    const itemStat = await stat(currItemPath);

    if (itemStat.isFile()) {
        await copyFile(currItemPath, destItemPath);
    } else if (itemStat.isDirectory()) {
        await mkdir(destItemPath, { recursive: true });
    }
}

const copy = async () => {
    const srcPath = getPath(import.meta.url, ['files']);
    const destPath = getPath(import.meta.url, ['files_copy']);

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
        await mkdir(destPath, { recursive: true });
        const items = await readdir(srcPath);
        const records = items.map((item) => copyItem(item, srcPath, destPath));
        await Promise.all(records);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    // with using cp
    // try {
    //     await cp(srcPath, destPath, { recursive: true });
    // } catch (err) {
    //     console.error(err);
    //     process.exit();
    // }
};

await copy();
