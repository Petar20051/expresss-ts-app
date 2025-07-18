import express from 'express';
import {loadRoutes} from './routes/load.routes.js';
import {errorHandler} from './middlewares/error.handler.js';
import {notFoundHandler} from './middlewares/not.found.handler.js';
import {attachUserId} from './middlewares/user-context.middleware.js';

const app = express();

app.use(express.json());
app.use(attachUserId);
loadRoutes(app);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
