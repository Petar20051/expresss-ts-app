import express, {Request, Response, NextFunction} from 'express';
import ProductService from './product.service.js';
import {validate} from '../../middlewares/validate.js';
import {createProductSchema, updateProductSchema, productIdParamSchema} from './product.schemas.js';

const router = express.Router();

router.get('/best-sellers', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const bestSellers = await ProductService.getBestSellers();
		res.json(bestSellers);
	} catch (error) {
		next(error);
	}
});

router.get('/highest-stock', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const highestStock = await ProductService.getHighestStockPerWarehouse();
		res.json(highestStock);
	} catch (error) {
		next(error);
	}
});

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const products = await ProductService.getAllProducts();
		res.json(products);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validate({params: productIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await ProductService.getProductById(req.params.id);
		res.json(product);
	} catch (error) {
		next(error);
	}
});

router.post('/', validate({body: createProductSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await ProductService.createProduct(req.body);
		res.status(201).json(product);
	} catch (error) {
		next(error);
	}
});

router.put(
	'/:id',
	validate({params: productIdParamSchema, body: updateProductSchema}),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const updated = await ProductService.updateProduct(req.params.id, req.body);
			res.json(updated);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', validate({params: productIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		await ProductService.deleteProduct(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

export default router;
