import {ZodType} from 'zod';
import {Request, Response, NextFunction} from 'express';

interface ValidationSchemas {
	body?: ZodType;
	params?: ZodType;
}

export const validate = (schemas: ValidationSchemas) => {
	return (req: Request, _res: Response, next: NextFunction) => {
		try {
			if (schemas.body) {
				req.body = schemas.body.parse(req.body);
			}
			if (schemas.params) {
				req.params = schemas.params.parse(req.params) as Record<string, string>;
			}
			next();
		} catch (error) {
			return next(error);
		}
	};
};
