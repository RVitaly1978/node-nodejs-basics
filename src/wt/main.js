import { Worker } from 'node:worker_threads';
import os from 'node:os';

import { getPath } from '../utils.js';

const baseNumber = 10;

const service = async (path, data) => {
    return new Promise((res) => {
        const worker = new Worker(path, { workerData: data });
        worker.on('message', (message) => res({ status: 'resolved', data: message }));
        worker.on('error', () => res({ status: 'error', data: null }));
    });
}

const performCalculations = async () => {
    const workerPathSegments = ['worker.js'];
    const workerPath = getPath(import.meta.url, workerPathSegments);

    const cpus = os.cpus();

    const services = cpus.map((item, index) => {
        const fbNumber = baseNumber + index;
        return service(workerPath, fbNumber);
    });

    try {
        const fibonacci = await Promise.all(services);
        console.log(fibonacci);
    } catch (err) {
        console.error(err);
    }
};

await performCalculations();
