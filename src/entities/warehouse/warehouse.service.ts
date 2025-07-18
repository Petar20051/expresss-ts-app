import {QueryTypes} from 'sequelize';
import sequelize from '../../db/sequelize.js';
import models from '../../db/models.init.js';
import {AppError} from '../../errors/app.error.js';
import {CreateWarehouseDto, UpdateWarehouseDto} from './warehouse.types.js';

class WarehouseService {
	constructor(private readonly warehouseModel = models.Warehouse) {}

	async getAllWarehouses() {
		return await this.warehouseModel.findAll();
	}

	async getWarehouseById(id: string) {
		const warehouse = await this.warehouseModel.findByPk(id);
		if (!warehouse) throw new AppError('Warehouse not found', 404);
		return warehouse;
	}

	async createWarehouse(data: CreateWarehouseDto, modifiedByUserId: string) {
		return await this.warehouseModel.create({
			...data,
			modifiedByUserId,
		});
	}

	async updateWarehouse(id: string, data: UpdateWarehouseDto, modifiedByUserId: string) {
		const warehouse = await this.getWarehouseById(id);
		return await warehouse.update({
			...data,
			modifiedByUserId,
		});
	}

	async deleteWarehouse(id: string) {
		const warehouse = await this.getWarehouseById(id);
		return await warehouse.destroy();
	}

	async getHighestStockPerWarehouse() {
		return await sequelize.query(
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

export default new WarehouseService();
