import {Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import {Models} from '../../db/models.js';

export default (sequelize: Sequelize) => {
	class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
		declare id: CreationOptional<string>;
		declare companyId: ForeignKey<string>;
		declare orderType: 'shipment' | 'delivery';
		declare partnerId: ForeignKey<string> | null;
		declare warehouseId: ForeignKey<string>;
		declare notes: string | null;
		declare date: CreationOptional<Date>;
		declare createdAt: CreationOptional<Date>;
		declare updatedAt: CreationOptional<Date>;
		declare deletedAt: CreationOptional<Date | null>;
		declare modifiedByUserId: ForeignKey<string>;

		static associate(models: Models) {
			Order.belongsTo(models.Company, {foreignKey: 'companyId', as: 'company'});
			Order.belongsTo(models.Partner, {foreignKey: 'partnerId', as: 'partner'});
			Order.belongsTo(models.Warehouse, {foreignKey: 'warehouseId', as: 'warehouse'});
			Order.belongsTo(models.User, {foreignKey: 'modifiedByUserId', as: 'modifiedBy'});
		}
	}

	Order.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				field: 'id',
			},
			companyId: {
				type: DataTypes.UUID,
				allowNull: false,
				field: 'companyId',
			},
			orderType: {
				type: DataTypes.ENUM('shipment', 'delivery'),
				allowNull: false,
				field: 'orderType',
			},
			partnerId: {
				type: DataTypes.UUID,
				allowNull: true,
				field: 'partnerId',
			},
			warehouseId: {
				type: DataTypes.UUID,
				allowNull: false,
				field: 'warehouseId',
			},
			notes: {
				type: DataTypes.TEXT,
				allowNull: true,
				field: 'notes',
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				field: 'date',
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
			modifiedByUserId: {
				type: DataTypes.UUID,
				allowNull: false,
				field: 'modifiedByUserId',
			},
		},
		{
			sequelize,
			modelName: 'Order',
			tableName: 'Order',
			timestamps: true,
			paranoid: true,
		}
	);
	Order.addHook('afterCreate', async (order, {transaction}) => {
		const {Invoice} = sequelize.models;

		if (order.dataValues.partnerId && order.dataValues.orderType === 'shipment') {
			await Invoice.create(
				{
					orderId: order.dataValues.id,
					status: 'unpaid',
					modifiedByUserId: order.dataValues.modifiedByUserId,
				},
				{transaction}
			);
		}
	});

	return Order;
};
