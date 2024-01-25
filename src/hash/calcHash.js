import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { Transform } from 'node:stream';
import { createHash } from 'node:crypto';
import { EOL } from 'node:os';

import { getPath } from '../utils.js';

const calculateHash = async () => {
    const filePathSegments = ['files', 'fileToCalculateHashFor.txt'];
    const filePath = getPath(import.meta.url, filePathSegments);

    const transformStream = new Transform({
        transform (chunk, encoding, callback) {
            const transformed = chunk.toString() + EOL;
            callback(null, transformed);
        },
    });

    const hash = createHash('sha256');

    try {
        await stat(filePath);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    createReadStream(filePath)
        .pipe(hash)
        .setEncoding('hex')
        .pipe(transformStream)
        .pipe(process.stdout);
};

await calculateHash();
