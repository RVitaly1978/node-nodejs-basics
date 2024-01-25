import { Transform } from 'node:stream';
import { EOL } from 'node:os';

const usageText = `Usage:
    - Type the content and press Enter
    - Press Enter on an empty line to exit the program
`;

const transform = async () => {
    const reverseStream = new Transform({
        transform (chunk, encoding, callback) {
            const transformed = chunk.toString().trim().split('').reverse().join('') + EOL + EOL;
            callback(null, transformed);
        },
    });

    process.stdin
        .on('data', (chunk) => {
            const str = chunk.toString();
            if (!str || !str.trim()) {
                process.exit(0);
            }
        })
        .pipe(reverseStream)
        .pipe(process.stdout)

    console.log(usageText);
};

await transform();
