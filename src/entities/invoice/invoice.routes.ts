import express, {Request, Response, NextFunction} from 'express';
import InvoiceService from './invoice.service.js';
import {validate} from '../../middlewares/validate.js';
import {createInvoiceSchema, updateInvoiceSchema, invoiceIdParamSchema} from './invoice.schemas.js';

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const invoices = await InvoiceService.getAllInvoices();
		res.json(invoices);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validate({params: invoiceIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const invoice = await InvoiceService.getInvoiceById(req.params.id);
		res.json(invoice);
	} catch (error) {
		next(error);
	}
});

router.post('/', validate({body: createInvoiceSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const invoice = await InvoiceService.createInvoice(req.body);
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
			const updated = await InvoiceService.updateInvoice(req.params.id, req.body);
			res.json(updated);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', validate({params: invoiceIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		await InvoiceService.deleteInvoice(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

export default router;
