import express, {Request, Response, NextFunction} from 'express';
import productService from './product.service.js';
import {validate} from '../../middlewares/validateRequest.js';
import {createProductSchema, updateProductSchema, productIdParamSchema} from './product.schemas.js';

const router = express.Router();

router.get('/best-sellers', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const bestSellers = await productService.getBestSellers();
		res.json(bestSellers);
	} catch (error) {
		next(error);
	}
});

router.get('/highest-stock', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const highestStock = await productService.getHighestStockPerWarehouse();
		res.json(highestStock);
	} catch (error) {
		next(error);
	}
});

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const products = await productService.getAllProducts();
		res.json(products);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validate({params: productIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await productService.getProductById(req.params.id);
		res.json(product);
	} catch (error) {
		next(error);
	}
});

router.post('/', validate({body: createProductSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await productService.createProduct(req.body);
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
			const updated = await productService.updateProduct(req.params.id, req.body);
			res.json(updated);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', validate({params: productIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		await productService.deleteProduct(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

export default router;
