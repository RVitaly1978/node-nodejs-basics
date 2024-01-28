import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';
import { createHash } from 'node:crypto';
import { EOL } from 'node:os';

import { getPath } from '../utils.js';

const calculateHash = async () => {
    const filePath = getPath(import.meta.url, ['files', 'fileToCalculateHashFor.txt']);

    const transformStream = new Transform({
        transform (chunk, encoding, callback) {
            const transformed = chunk.toString() + EOL;
            callback(null, transformed);
        },
    });

    try {
        await stat(filePath);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    // use pipe
    // createReadStream(filePath)
    //     .pipe(createHash('sha256'))
    //     .setEncoding('hex')
    //     .pipe(transformStream)
    //     .pipe(process.stdout);

    try {
        await pipeline(
            createReadStream(filePath),
            createHash('sha256').setEncoding('hex'),
            transformStream,
            process.stdout,
        );
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

await calculateHash();
