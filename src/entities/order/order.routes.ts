import express, {Request, Response, NextFunction} from 'express';
import OrderService from './order.service.js';
import {validate} from '../../middlewares/validate.js';
import {createOrderSchema, updateOrderSchema, orderIdParamSchema} from './order.schemas.js';

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const orders = await OrderService.getAllOrders();
		res.json(orders);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validate({params: orderIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const order = await OrderService.getOrderById(req.params.id);
		res.json(order);
	} catch (error) {
		next(error);
	}
});

router.post('/', validate({body: createOrderSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const order = await OrderService.createOrder(req.body);
		res.status(201).json(order);
	} catch (error) {
		next(error);
	}
});

router.put(
	'/:id',
	validate({params: orderIdParamSchema, body: updateOrderSchema}),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const updated = await OrderService.updateOrder(req.params.id, req.body);
			res.json(updated);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', validate({params: orderIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		await OrderService.deleteOrder(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

export default router;
