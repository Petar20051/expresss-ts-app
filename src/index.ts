import express from 'express';
import {Sequelize, Dialect} from 'sequelize';
import {dbConfig} from './config/sequalize.config.js';

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
	host: dbConfig.host,
	port: dbConfig.port,
	dialect: dbConfig.dialect as Dialect,
	logging: dbConfig.logging,
});

app.use(express.json());

app.get('/', (req, res) => {
	res.send('🚀 Server is running and DB is configured.');
});

(async () => {
	try {
		await sequelize.authenticate();
		console.log('✅ Database connected successfully.');

		app.listen(PORT, () => {
			console.log(`✅ Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('❌ Failed to connect to DB:', error);
	}
})();
