import sequelize from './db/sequelize.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;
let server: ReturnType<typeof app.listen>;
let isShuttingDown = false;

export const start = async () => {
	await sequelize.authenticate();
	console.log('✅ Database connected');

	server = app.listen(PORT, () => {
		console.log(`🚀 Server running at http://localhost:${PORT}`);
	});
};

export const shutdown = async () => {
	if (isShuttingDown) return;
	isShuttingDown = true;

	console.log('\n🛑 Shutting down...');

	if (server) {
		server.close(() => console.log('🧯 HTTP server closed'));
	}

	try {
		await sequelize.close();
		console.log('📦 DB connection closed');
		process.exit(0);
	} catch (err) {
		console.error('⚠️ Shutdown error:', err);
		process.exit(1);
	}
};
