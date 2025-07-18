import {Transaction} from 'sequelize';
import models from '../../db/models.init.js';
import sequelize from '../../db/sequelize.js';
import {AppError} from '../../errors/app.error.js';
import {CreateOrderItemDto, UpdateOrderItemDto} from './orderItem.types.js';
import {
	validateOrderProductCompanyMatch,
	validateShipmentStockAvailability,
	validateWarehouseSupportsProductType,
} from './orderItem.validators.ts.js';

class OrderItemService {
	constructor(private readonly orderItemModel = models.OrderItem) {}

	async getAllOrderItems() {
		return await this.orderItemModel.findAll();
	}

	async getOrderItemById(id: string) {
		const item = await this.orderItemModel.findByPk(id);
		if (!item) throw new AppError('Order item not found', 404);
		return item;
	}

	async createOrderItem(data: CreateOrderItemDto, modifiedByUserId: string) {
		return await sequelize.transaction(async (transaction: Transaction) => {
			await validateWarehouseSupportsProductType(data, transaction, models);
			await validateOrderProductCompanyMatch(data, transaction, models);
			await validateShipmentStockAvailability(data, transaction, models);

			return await this.orderItemModel.create({...data, modifiedByUserId}, {transaction});
		});
	}

	async updateOrderItem(id: string, data: UpdateOrderItemDto, modifiedByUserId: string) {
		const item = await this.getOrderItemById(id);
		return await item.update({...data, modifiedByUserId});
	}

	async deleteOrderItem(id: string) {
		const item = await this.getOrderItemById(id);
		return await item.destroy();
	}
}

export default new OrderItemService();
