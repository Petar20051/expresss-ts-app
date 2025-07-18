import models from '../../db/models.init.js';
import {AppError} from '../../errors/app.error.js';
import {CreateOrderItemDto, UpdateOrderItemDto} from './orderItem.types.js';

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

	async createOrderItem(data: CreateOrderItemDto) {
		return await this.orderItemModel.create(data);
	}

	async updateOrderItem(id: string, data: UpdateOrderItemDto) {
		const item = await this.getOrderItemById(id);
		return await item.update(data);
	}

	async deleteOrderItem(id: string) {
		const item = await this.getOrderItemById(id);
		return await item.destroy();
	}
}

export default new OrderItemService();
