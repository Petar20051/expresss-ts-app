import {Request, Response, NextFunction} from 'express';
import {AppError} from '../errors/appError.js';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	next(new AppError(`Route ${req.originalUrl} not found`, 404));
};
