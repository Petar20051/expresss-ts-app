import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db/sequelize.js';
import {errorHandler} from './middlewares/error.middleware.js';
import {loadRoutes} from './routes/loadRoutes.js';
import {notFoundHandler} from './middlewares/not-found.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

loadRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

let server: ReturnType<typeof app.listen>;

export const start = async () => {
	try {
		await sequelize.authenticate();
		console.log('✅ Database connected');

		server = app.listen(PORT, () => {
			console.log(`🚀 Server running at http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error('❌ Failed to connect to DB:', err);
		process.exit(1);
	}
};

let isShuttingDown = false;

export const shutdown = async () => {
	if (isShuttingDown) return;
	isShuttingDown = true;

	console.log('\n🛑 Shutting down...');

	if (server) {
		server.close(() => {
			console.log('🧯 HTTP server closed');
		});
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
