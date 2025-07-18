import express, {Request, Response, NextFunction} from 'express';
import partnerService from './partner.service.js';
import {validate} from '../../middlewares/validate.request.js';
import {createPartnerSchema, updatePartnerSchema, partnerIdParamSchema} from './partner.schemas.js';

const router = express.Router();

router.get('/best-customer', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const bestCustomer = await partnerService.getBestCustomerPerCompany();
		res.json(bestCustomer);
	} catch (error) {
		next(error);
	}
});

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const partners = await partnerService.getAllPartners();
		res.json(partners);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validate({params: partnerIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const partner = await partnerService.getPartnerById(req.params.id);
		res.json(partner);
	} catch (error) {
		next(error);
	}
});

router.post('/', validate({body: createPartnerSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const partner = await partnerService.createPartner(req.body);
		res.status(201).json(partner);
	} catch (error) {
		next(error);
	}
});

router.put(
	'/:id',
	validate({params: partnerIdParamSchema, body: updatePartnerSchema}),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const updated = await partnerService.updatePartner(req.params.id, req.body);
			res.json(updated);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', validate({params: partnerIdParamSchema}), async (req: Request, res: Response, next: NextFunction) => {
	try {
		await partnerService.deletePartner(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

export default router;
