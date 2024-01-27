import { spawn } from 'node:child_process';

import { getPath } from '../utils.js';

const spawnChildProcess = async (args) => {
    const scriptPathSegments = ['files', 'script.js'];
    const scriptPath = getPath(import.meta.url, scriptPathSegments);

    const scriptProcess = spawn('node', [scriptPath, ...args]);

    scriptProcess.on('close', () => {
        process.exit(0);
    });

    scriptProcess.stdout.pipe(process.stdout);
    process.stdin.pipe(scriptProcess.stdin);
};

// Put your arguments in function call to test this functionality
// spawnChildProcess( /* [someArgument1, someArgument2, ...] */);
spawnChildProcess([12, 44, 'qwerty']);
