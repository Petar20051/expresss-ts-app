import {Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import {Models} from '../../db/modelsInit.js';
import {AppError} from '../../errors/appError.js';

export default (sequelize: Sequelize) => {
	class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> {
		declare id: CreationOptional<string>;
		declare orderId: ForeignKey<string>;
		declare productId: ForeignKey<string>;
		declare quantity: number;
		declare unitPrice: number;
		declare createdAt: CreationOptional<Date>;
		declare updatedAt: CreationOptional<Date>;
		declare deletedAt: CreationOptional<Date | null>;
		declare modifiedByUserId: ForeignKey<string>;

		static associate(models: Models) {
			OrderItem.belongsTo(models.Order, {foreignKey: 'orderId', as: 'order'});
			OrderItem.belongsTo(models.Product, {foreignKey: 'productId', as: 'product'});
			OrderItem.belongsTo(models.User, {foreignKey: 'modifiedByUserId', as: 'modifiedBy'});
		}
	}

	OrderItem.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			orderId: {
				type: DataTypes.UUID,
				allowNull: false,
				field: 'orderId',
			},
			productId: {
				type: DataTypes.UUID,
				allowNull: false,
				field: 'productId',
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 1,
				},
			},
			unitPrice: {
				type: DataTypes.DECIMAL(12, 2),
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			modifiedByUserId: {
				type: DataTypes.UUID,
				allowNull: false,
				field: 'modifiedByUserId',
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				field: 'createdAt',
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				field: 'updatedAt',
			},
			deletedAt: {
				type: DataTypes.DATE,
				allowNull: true,
				field: 'deletedAt',
			},
		},
		{
			sequelize,
			modelName: 'OrderItem',
			tableName: 'OrderItem',
			timestamps: true,
			paranoid: true,
			indexes: [
				{
					unique: true,
					fields: ['orderId', 'productId'],
					name: 'unique_order_product',
				},
			],
		}
	);

	OrderItem.addHook('beforeSave', async (orderItem, {transaction}) => {
		const {Order, Product, Warehouse} = sequelize.models;

		const order = await Order.findByPk(orderItem.dataValues.orderId, {
			transaction,
			attributes: ['id', 'warehouseId'],
		});
		if (!order) throw new AppError('Order not found');

		const product = await Product.findByPk(orderItem.dataValues.productId, {
			transaction,
			attributes: ['id', 'productType'],
		});
		if (!product) throw new AppError('Product not found');

		const warehouse = await Warehouse.findByPk(order.dataValues.warehouseId, {
			transaction,
			attributes: ['id', 'supportedType'],
		});
		if (!warehouse) throw new AppError('Warehouse not found');

		if (warehouse.dataValues.supportedType !== product.dataValues.productType) {
			throw new AppError(
				`Incompatible types: cannot store ${product.dataValues.productType} product in ${warehouse.dataValues.supportedType} warehouse`
			);
		}
	});

	OrderItem.addHook('beforeSave', async (orderItem, {transaction}) => {
		const {Order, Product} = sequelize.models;

		const order = await Order.findByPk(orderItem.dataValues.orderId, {
			transaction,
			attributes: ['companyId'],
		});
		if (!order) throw new AppError('Order not found');

		const product = await Product.findByPk(orderItem.dataValues.productId, {
			transaction,
			attributes: ['companyId'],
		});
		if (!product) throw new AppError('Product not found');

		if (order.dataValues.companyId !== product.dataValues.companyId) {
			throw new AppError('Order and product must belong to the same company');
		}
	});

	OrderItem.addHook('beforeSave', async (orderItem, {transaction}) => {
		const {Order, OrderItem: OrderItemModel} = sequelize.models;

		const order = await Order.findByPk(orderItem.dataValues.orderId, {
			transaction,
			attributes: ['id', 'warehouseId', 'orderType'],
		});
		if (!order) throw new AppError('Order not found');

		if (order.dataValues.orderType !== 'shipment') return;

		const stockItems = await OrderItemModel.findAll({
			include: [
				{
					model: Order,
					as: 'order',
					where: {
						warehouseId: order.dataValues.warehouseId,
						deletedAt: null,
					},
					attributes: ['orderType'],
				},
			],
			where: {
				productId: orderItem.dataValues.productId,
				deletedAt: null,
			},
			attributes: ['quantity'],
			transaction,
		});

		const availableStock = stockItems.reduce((sum, item) => {
			const order = item.get('order') as {orderType: 'shipment' | 'delivery'};
			const orderType = order?.orderType;

			if (orderType === 'delivery') return sum + item.dataValues.quantity;
			if (orderType === 'shipment') return sum - item.dataValues.quantity;
			return sum;
		}, 0);

		if (availableStock < orderItem.dataValues.quantity) {
			throw new AppError(`Insufficient stock: Available ${availableStock}, Attempted shipment ${orderItem.dataValues.quantity}`);
		}
	});

	return OrderItem;
};
