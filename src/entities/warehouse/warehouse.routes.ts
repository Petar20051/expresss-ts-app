import express, {Request, Response, NextFunction} from 'express';
import warehouseService from './warehouse.service.js';
import {validate} from '../../middlewares/validateRequest.js';
import {createWarehouseSchema, updateWarehouseSchema, warehouseIdParamSchema} from './warehouse.schemas.js';

const router = express.Router();

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
		const warehouse = await warehouseService.createWarehouse(req.body);
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
			const updated = await warehouseService.updateWarehouse(req.params.id, req.body);
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
