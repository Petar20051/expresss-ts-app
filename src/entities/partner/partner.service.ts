import {QueryTypes, Sequelize} from 'sequelize';
import models from '../../db/models.js';
import {AppError} from '../../errors/app-error.js';
import {CreatePartnerDto, UpdatePartnerDto} from './partner.types.js';
import sequelize from '../../db/sequelize.js';

class PartnerService {
	constructor(private readonly partnerModel = models.Partner, private readonly sequelize: Sequelize) {}

	async getAllPartners() {
		return await this.partnerModel.findAll();
	}

	async getPartnerById(id: string) {
		const partner = await this.partnerModel.findByPk(id);
		if (!partner) throw new AppError('Partner not found');
		return partner;
	}

	async createPartner(data: CreatePartnerDto) {
		return await this.partnerModel.create(data);
	}

	async updatePartner(id: string, data: UpdatePartnerDto) {
		const partner = await this.getPartnerById(id);
		return await partner.update(data);
	}

	async deletePartner(id: string) {
		const partner = await this.getPartnerById(id);
		return await partner.destroy();
	}

	async getBestCustomerPerCompany() {
		return await this.sequelize.query(
			`
			SELECT
				o."companyId",
				p."id" AS "partnerId",
				p."name" AS "partnerName",
				COUNT(o."id") AS "totalOrders"
			FROM "Order" o
			JOIN "Partner" p ON o."partnerId" = p."id"
			WHERE p."type" = 'customer'
			GROUP BY o."companyId", p."id", p."name"
			ORDER BY "totalOrders" DESC
			`,
			{type: QueryTypes.SELECT}
		);
	}
}

export default new PartnerService(models.Partner, sequelize);
