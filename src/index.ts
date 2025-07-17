import {start, shutdown} from './server.js';

await start();

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
