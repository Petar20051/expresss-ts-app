import {ErrorRequestHandler} from 'express';
import {ZodError} from 'zod';
import {AppError} from '../errors/appError.js';
import {ForeignKeyConstraintError, UniqueConstraintError} from 'sequelize';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	if (err instanceof ZodError) {
		return res.status(400).json({
			message: 'Validation error',
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
