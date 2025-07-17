import models from '../../db/models.js';
import {AppError} from '../../errors/app-error.js';
import {CreateOrderDto, UpdateOrderDto} from './order.types.js';

class OrderService {
	constructor(private readonly orderModel = models.Order) {}

	async getAllOrders() {
		return await this.orderModel.findAll();
	}

	async getOrderById(id: string) {
		const order = await this.orderModel.findByPk(id);
		if (!order) throw new AppError('Order not found');
		return order;
	}

	async createOrder(data: CreateOrderDto) {
		return await this.orderModel.create(data);
	}

	async updateOrder(id: string, data: UpdateOrderDto) {
		const order = await this.getOrderById(id);
		return await order.update(data);
	}

	async deleteOrder(id: string) {
		const order = await this.getOrderById(id);
		return await order.destroy();
	}
}

export default OrderService;
