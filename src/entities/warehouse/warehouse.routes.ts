import express, {Request, Response, NextFunction} from 'express';
import warehouseService from './warehouse.service.js';
import {validate} from '../../middlewares/validate.request.js';
import {createWarehouseSchema, updateWarehouseSchema, warehouseIdParamSchema} from './warehouse.schemas.js';

const router = express.Router();

router.get('/highest-stock', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const highestStock = await warehouseService.getHighestStockPerWarehouse();
		res.json(highestStock);
	} catch (error) {
		next(error);
	}
});

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const warehouses = await warehouseService.getAllWarehouses();
		res.json(warehouses);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validate({params: warehouseIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const warehouse = await warehouseService.getWarehouseById(req.params.id);
		res.json(warehouse);
	} catch (error) {
		next(error);
	}
});

router.post('/', validate({body: createWarehouseSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.header('x-user-id') || '';
		const warehouse = await warehouseService.createWarehouse(req.body, userId);
		res.status(201).json(warehouse);
	} catch (error) {
		next(error);
	}
});

router.put(
	'/:id',
	validate({params: warehouseIdParamSchema, body: updateWarehouseSchema}),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.header('x-user-id') || '';
			const updated = await warehouseService.updateWarehouse(req.params.id, req.body, userId);
			res.json(updated);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', validate({params: warehouseIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		await warehouseService.deleteWarehouse(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

export default router;
