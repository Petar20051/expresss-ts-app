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

	async createProduct(data: CreateProductDto) {
		return await this.productModel.create(data);
	}

	async updateProduct(id: string, data: UpdateProductDto) {
		const product = await this.getProductById(id);
		return await product.update(data);
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

	async getHighestStockPerWarehouse() {
		return await this.sequelize.query(
			`
			WITH stock_per_product AS (
				SELECT
					w."id" AS "warehouseId",
					w."name" AS "WarehouseName",
					p."name" AS "ProductName",
					p."id" AS "productId",
					SUM(
						CASE
							WHEN o."orderType" = 'delivery' THEN oi."quantity"
							WHEN o."orderType" = 'shipment' THEN -oi."quantity"
							ELSE 0
						END
					) AS "stock"
				FROM "Order" o
				JOIN "OrderItem" oi ON o."id" = oi."orderId"
				JOIN "Product" p ON p."id" = oi."productId"
				JOIN "Warehouse" w ON o."warehouseId" = w."id"
				WHERE o."deletedAt" IS NULL
				  AND oi."deletedAt" IS NULL
				  AND p."deletedAt" IS NULL
				GROUP BY w."id", p."id", p."name", w."name"
			),
			max_stock AS (
				SELECT "WarehouseName", MAX("stock") AS max_stock
				FROM stock_per_product
				GROUP BY "WarehouseName"
			)
			SELECT s."WarehouseName", s."ProductName", s."stock"
			FROM stock_per_product s
			JOIN max_stock m
			  ON s."WarehouseName" = m."WarehouseName"
			 AND s."stock" = m.max_stock;
			`,
			{type: QueryTypes.SELECT}
		);
	}
}

export default new ProductService(models.Product, sequelize);
