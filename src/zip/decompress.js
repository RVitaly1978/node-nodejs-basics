import { createReadStream, createWriteStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import zlib from 'node:zlib';

import { getPath } from '../utils.js';

const decompress = async () => {
    const srcPath = getPath(import.meta.url, ['files', 'archive.gz']);
    const destPath = getPath(import.meta.url, ['files', 'fileToCompress.txt']);

    try {
        await stat(srcPath);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    const readableStream = createReadStream(srcPath);
    const writableStream = createWriteStream(destPath);
    const unzip = zlib.createUnzip();

    // use pipe
    // readableStream(srcPath)
    //     .pipe(unzip)
    //     .pipe(writableStream)
    //     .on('error', (error) => { console.error(error) })
    //     .on('finish', () => { process.exit(0) });

    try {
        await pipeline(readableStream, unzip, writableStream);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

await decompress();
