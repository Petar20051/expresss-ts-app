import express, {Request, Response, NextFunction} from 'express';
import invoiceService from './invoice.service.js';
import {validate} from '../../middlewares/validate.request.js';
import {createInvoiceSchema, updateInvoiceSchema, invoiceIdParamSchema} from './invoice.schemas.js';

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const invoices = await invoiceService.getAllInvoices();
		res.json(invoices);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validate({params: invoiceIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const invoice = await invoiceService.getInvoiceById(req.params.id);
		res.json(invoice);
	} catch (error) {
		next(error);
	}
});

router.post('/', validate({body: createInvoiceSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const invoice = await invoiceService.createInvoice(req.body);
		res.status(201).json(invoice);
	} catch (error) {
		next(error);
	}
});

router.put(
	'/:id',
	validate({params: invoiceIdParamSchema, body: updateInvoiceSchema}),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const updated = await invoiceService.updateInvoice(req.params.id, req.body);
			res.json(updated);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', validate({params: invoiceIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		await invoiceService.deleteInvoice(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

export default router;
