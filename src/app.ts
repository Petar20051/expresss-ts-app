import express from 'express';
import {loadRoutes} from './routes/loadRoutes.js';
import {errorHandler} from './middlewares/error.middleware.js';
import {notFoundHandler} from './middlewares/not-found.js';

const app = express();

app.use(express.json());

loadRoutes(app);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
