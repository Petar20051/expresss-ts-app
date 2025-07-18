import express, {Request, Response, NextFunction} from 'express';
import orderItemService from './orderItem.service.js';
import {validate} from '../../middlewares/validate.request.js';
import {createOrderItemSchema, updateOrderItemSchema, orderItemIdParamSchema} from './orderItem.schemas.js';

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const items = await orderItemService.getAllOrderItems();
		res.json(items);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validate({params: orderItemIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const item = await orderItemService.getOrderItemById(req.params.id);
		res.json(item);
	} catch (error) {
		next(error);
	}
});

router.post('/', validate({body: createOrderItemSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const item = await orderItemService.createOrderItem(req.body);
		res.status(201).json(item);
	} catch (error) {
		next(error);
	}
});

router.put(
	'/:id',
	validate({params: orderItemIdParamSchema, body: updateOrderItemSchema}),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const updated = await orderItemService.updateOrderItem(req.params.id, req.body);
			res.json(updated);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', validate({params: orderItemIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		await orderItemService.deleteOrderItem(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

export default router;
