import {AppError} from '../../errors/app.error.js';
import {CreateOrderItemDto} from './orderItem.types.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function validateWarehouseSupportsProductType(orderItem: CreateOrderItemDto, transaction: any, models: any) {
	const {Order, Product, Warehouse} = models;

	const order = await Order.findByPk(orderItem.orderId, {
		transaction,
		attributes: ['warehouseId'],
	});
	if (!order) throw new AppError('Order not found');

	const product = await Product.findByPk(orderItem.productId, {
		transaction,
		attributes: ['productType'],
	});
	if (!product) throw new AppError('Product not found');

	const warehouse = await Warehouse.findByPk(order.warehouseId, {
		transaction,
		attributes: ['supportedType'],
	});
	if (!warehouse) throw new AppError('Warehouse not found');

	if (warehouse.supportedType !== product.productType) {
		throw new AppError(`Incompatible types: cannot store ${product.productType} product in ${warehouse.supportedType} warehouse`);
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function validateOrderProductCompanyMatch(orderItem: CreateOrderItemDto, transaction: any, models: any) {
	const {Order, Product} = models;

	const order = await Order.findByPk(orderItem.orderId, {
		transaction,
		attributes: ['companyId'],
	});
	if (!order) throw new AppError('Order not found');

	const product = await Product.findByPk(orderItem.productId, {
		transaction,
		attributes: ['companyId'],
	});
	if (!product) throw new AppError('Product not found');

	if (order.companyId !== product.companyId) {
		throw new AppError('Order and product must belong to the same company');
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function validateShipmentStockAvailability(orderItem: CreateOrderItemDto, transaction: any, models: any) {
	const {Order, OrderItem} = models;

	const order = await Order.findByPk(orderItem.orderId, {
		transaction,
		attributes: ['warehouseId', 'orderType'],
	});
	if (!order) throw new AppError('Order not found');

	if (order.orderType !== 'shipment') return;

	const stockItems = await OrderItem.findAll({
		include: [
			{
				model: Order,
				as: 'order',
				where: {
					warehouseId: order.warehouseId,
					deletedAt: null,
				},
				attributes: ['orderType'],
			},
		],
		where: {
			productId: orderItem.productId,
			deletedAt: null,
		},
		attributes: ['quantity'],
		transaction,
	});

	const availableStock = stockItems.reduce(
		(sum: number, item: {get: (arg0: string) => {orderType: 'shipment' | 'delivery'}; quantity: number}) => {
			const order = item.get('order') as {orderType: 'shipment' | 'delivery'};
			if (order?.orderType === 'delivery') return sum + item.quantity;
			if (order?.orderType === 'shipment') return sum - item.quantity;
			return sum;
		},
		0
	);

	if (availableStock < orderItem.quantity) {
		throw new AppError(`Insufficient stock: Available ${availableStock}, Attempted shipment ${orderItem.quantity}`);
	}
}
