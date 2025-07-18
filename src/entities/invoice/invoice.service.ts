import models from '../../db/models.init.js';
import {AppError} from '../../errors/app.error.js';
import {CreateInvoiceDto, UpdateInvoiceDto} from './invoice.types.js';

class InvoiceService {
	constructor(private readonly invoiceModel = models.Invoice) {}

	async getAllInvoices() {
		return await this.invoiceModel.findAll();
	}

	async getInvoiceById(id: string) {
		const invoice = await this.invoiceModel.findByPk(id);
		if (!invoice) throw new AppError('Invoice not found', 404);
		return invoice;
	}

	async createInvoice(data: CreateInvoiceDto, modifiedByUserId: string) {
		return await this.invoiceModel.create({
			...data,
			modifiedByUserId,
		});
	}

	async updateInvoice(id: string, data: UpdateInvoiceDto, modifiedByUserId: string) {
		const invoice = await this.getInvoiceById(id);
		return await invoice.update({
			...data,
			modifiedByUserId,
		});
	}

	async deleteInvoice(id: string) {
		const invoice = await this.getInvoiceById(id);
		return await invoice.destroy();
	}
}

export default new InvoiceService();
