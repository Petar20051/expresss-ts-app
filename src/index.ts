import {start, shutdown} from './server.js';

start();

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('uncaughtException', (err) => {
	console.error('❌ Uncaught Exception:', err);
	shutdown();
});
process.on('unhandledRejection', (reason) => {
	console.error('❌ Unhandled Rejection:', reason);
	shutdown();
});
