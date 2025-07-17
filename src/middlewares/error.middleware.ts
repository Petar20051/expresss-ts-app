import {ErrorRequestHandler} from 'express';
import {ZodError} from 'zod';
import {AppError} from '../errors/app-error.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	if (err instanceof ZodError) {
		return res.status(400).json({
			message: 'Validation error',
		});
	}

	if (err instanceof AppError) {
		return res.status(err.statusCode).json({message: err.message});
	}

	console.error('Unhandled error:', err);
	return res.status(500).json({message: 'Internal Server Error'});
};
