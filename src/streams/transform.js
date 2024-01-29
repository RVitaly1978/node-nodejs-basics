import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { EOL } from 'node:os';

const usageText = `Usage:
    - Type the content and press Enter
    - Press Enter on an empty line to exit the program
`;

const transform = async () => {
    console.log(usageText);

    const reverseStream = new Transform({
        transform (chunk, encoding, callback) {
            const transformed = chunk.toString().trim().split('').reverse().join('') + EOL + EOL;
            callback(null, transformed);
        },
    });

    process.stdin.on('data', (chunk) => {
        const str = chunk.toString();
        if (!str || !str.trim()) { process.exit(0) }
    });

    try {
        await pipeline(process.stdin, reverseStream, process.stdout);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

await transform();
