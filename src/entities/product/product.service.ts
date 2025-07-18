import {QueryTypes, Sequelize} from 'sequelize';
import models from '../../db/models.init.js';
import {AppError} from '../../errors/app.error.js';
import {CreateProductDto, UpdateProductDto} from './product.types.js';
import sequelize from '../../db/sequelize.js';

class ProductService {
	constructor(private readonly productModel = models.Product, private readonly sequelize: Sequelize) {}

	async getAllProducts() {
		return await this.productModel.findAll();
	}

	async getProductById(id: string) {
		const product = await this.productModel.findByPk(id);
		if (!product) throw new AppError('Product not found', 404);
		return product;
	}

	async createProduct(data: CreateProductDto, modifiedByUserId: string) {
		return await this.productModel.create({
			...data,
			modifiedByUserId,
		});
	}

	async updateProduct(id: string, data: UpdateProductDto, modifiedByUserId: string) {
		const product = await this.getProductById(id);
		return await product.update({
			...data,
			modifiedByUserId,
		});
	}

	async deleteProduct(id: string) {
		const product = await this.getProductById(id);
		return await product.destroy();
	}

	async getBestSellers() {
		return await this.sequelize.query(
			`
			SELECT 
				p."id" AS "productId",
				p."name" AS "productName",
				o."companyId",
				SUM(oi."quantity") AS "totalSold"
			FROM "OrderItem" oi
			JOIN "Order" o ON oi."orderId" = o."id"
			JOIN "Product" p ON oi."productId" = p."id"
			WHERE o."orderType" = 'shipment'
			  AND o."partnerId" IS NOT NULL
			GROUP BY p."id", p."name", o."companyId"
			ORDER BY "totalSold" DESC
			`,
			{type: QueryTypes.SELECT}
		);
	}
}

export default new ProductService(models.Product, sequelize);
