import { createReadStream, createWriteStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import zlib from 'node:zlib';

import { getPath } from '../utils.js';

const compress = async () => {
    const srcPathSegments = ['files', 'fileToCompress.txt'];
    const destPathSegments = ['files', 'archive.gz'];

    const srcPath = getPath(import.meta.url, srcPathSegments);
    const destPath = getPath(import.meta.url, destPathSegments);

    try {
        await stat(srcPath);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    const writableStream = createWriteStream(destPath);

    const zip = zlib.createGzip();

    createReadStream(srcPath)
        .pipe(zip)
        .pipe(writableStream)
        .on('error', (error) => { console.error(error) })
        .on('finish', () => { process.exit(0) });
};

await compress();
