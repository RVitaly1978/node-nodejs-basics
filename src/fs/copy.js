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
    return;
}

const copy = async () => {
    const srcFolderPathSegments = ['files'];
    const destFolderPathSegments = ['files_copy'];

    const srcPath = getPath(import.meta.url, srcFolderPathSegments);
    const destPath = getPath(import.meta.url, destFolderPathSegments);

    try {
        await stat(srcPath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throwError();
        } else {
            console.error(err);
            return;
        }
    }

    try {
        await stat(destPath);
        throwError();
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error(err);
            return;
        }
    }

    // without using cp
    try {
        await mkdir(destPath, { recursive: true });
        const items = await readdir(srcPath);
        const records = items.map((item) => copyItem(item, srcPath, destPath));
        await Promise.all(records);
        process.exit();
    } catch (err) {
        console.error(err);
    }

    // with using cp
    // try {
    //     await cp(srcPath, destPath, { recursive: true });
    // } catch (err) {
    //     console.error(err);
    // }
};

await copy();
