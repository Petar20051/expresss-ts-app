import models from '../../db/models.js';
import {AppError} from '../../errors/app-error.js';
import {CreateCompanyDto, UpdateCompanyDto} from './company.types.js';

class CompanyService {
	constructor(private readonly companyModel = models.Company) {}

	async getAllCompanies() {
		return await this.companyModel.findAll();
	}

	async getCompanyById(id: string) {
		const company = await this.companyModel.findByPk(id);
		if (!company) throw new AppError('Company not found', 404);
		return company;
	}

	async createCompany(data: CreateCompanyDto) {
		return await this.companyModel.create(data);
	}

	async updateCompany(id: string, data: UpdateCompanyDto) {
		const company = await this.getCompanyById(id);
		return await company.update(data);
	}

	async deleteCompany(id: string) {
		const company = await this.getCompanyById(id);
		return await company.destroy();
	}
}

export default CompanyService;
