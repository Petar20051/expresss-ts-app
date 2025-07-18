import models from '../../db/models.init.js';
import {AppError} from '../../errors/app.error.js';
import {CreateOrderDto, UpdateOrderDto} from './order.types.js';

class OrderService {
	constructor(private readonly orderModel = models.Order) {}

	async getAllOrders() {
		return await this.orderModel.findAll();
	}

	async getOrderById(id: string) {
		const order = await this.orderModel.findByPk(id);
		if (!order) throw new AppError('Order not found', 404);
		return order;
	}

	async createOrder(data: CreateOrderDto, modifiedByUserId: string) {
		return await this.orderModel.create({
			...data,
			modifiedByUserId,
		});
	}

	async updateOrder(id: string, data: UpdateOrderDto, modifiedByUserId: string) {
		const order = await this.getOrderById(id);
		return await order.update({
			...data,
			modifiedByUserId,
		});
	}

	async deleteOrder(id: string) {
		const order = await this.getOrderById(id);
		return await order.destroy();
	}
}

export default new OrderService();
