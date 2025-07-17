import express from 'express';
import CompanyService from './company.service.js';
import {validate} from '../../middlewares/validate.js';
import {createCompanySchema, updateCompanySchema, companyIdParamSchema} from './company.schemas.js';

const router = express.Router();

router.get('/', async (_req, res, next) => {
	try {
		const companies = await CompanyService.getAllCompanies();
		res.json(companies);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validate({params: companyIdParamSchema}), async (req, res, next) => {
	try {
		const company = await CompanyService.getCompanyById(req.params.id);
		res.json(company);
	} catch (error) {
		next(error);
	}
});

router.post('/', validate({body: createCompanySchema}), async (req, res, next) => {
	try {
		const company = await CompanyService.createCompany(req.body);
		res.status(201).json(company);
	} catch (error) {
		next(error);
	}
});

router.put('/:id', validate({params: companyIdParamSchema, body: updateCompanySchema}), async (req, res, next) => {
	try {
		const updated = await CompanyService.updateCompany(req.params.id, req.body);
		res.json(updated);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validate({params: companyIdParamSchema}), async (req, res, next) => {
	try {
		await CompanyService.deleteCompany(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

export default router;
