import {ErrorRequestHandler} from 'express';
import {ZodError} from 'zod';
import {AppError} from '../errors/app.error.js';
import {ForeignKeyConstraintError, UniqueConstraintError} from 'sequelize';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	if (err instanceof ZodError) {
		return res.status(400).json({
			message: 'Validation error',
			errors: err.issues.map((e) => ({
				path: e.path.join('.'),
				message: e.message,
			})),
		});
	}

	if (err instanceof UniqueConstraintError) {
		return res.status(400).json({message: 'Duplicate entry'});
	}

	if (err instanceof ForeignKeyConstraintError) {
		return res.status(400).json({
			message: 'Invalid reference: related entity not found',
		});
	}

	if (err instanceof AppError) {
		return res.status(err.statusCode).json({message: err.message});
	}

	console.error('Unhandled error:', err);
	return res.status(500).json({message: 'Internal Server Error'});
};
