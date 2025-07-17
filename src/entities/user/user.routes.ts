import express, {Request, Response, NextFunction} from 'express';
import UserService from './user.service.js';
import {validate} from '../../middlewares/validate.js';
import {createUserSchema, updateUserSchema, userIdParamSchema} from './user.schemas.js';

const router = express.Router();
const userService = new UserService();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await userService.getAllUsers();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validate({params: userIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userService.getUserById(req.params.id);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.post('/', validate({body: createUserSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userService.createUser(req.body);
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
});

router.put(
	'/:id',
	validate({params: userIdParamSchema, body: updateUserSchema}),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const updated = await userService.updateUser(req.params.id, req.body);
			res.json(updated);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', validate({params: userIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		await userService.deleteUser(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

export default router;
