import {Request, Response, NextFunction} from 'express';

export function attachUserId(req: Request, _res: Response, next: NextFunction) {
	const userId = req.header('x-user-id');
	if (!userId) {
		return next();
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(req as any).userId = userId;
	next();
}
