import {Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import {Models} from '../../db/models.js';

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
		declare modifiedByUserId: ForeignKey<string> | null;

		static associate(models: Models) {
			OrderItem.belongsTo(models.Order, {foreignKey: 'orderId', as: 'order'});
			OrderItem.belongsTo(models.Product, {foreignKey: 'productId', as: 'product'});
			OrderItem.belongsTo(models.User, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedBy',
			});
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
			},
			productId: {
				type: DataTypes.UUID,
				allowNull: false,
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
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			deletedAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			modifiedByUserId: {
				type: DataTypes.UUID,
				allowNull: false,
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

	return OrderItem;
};
