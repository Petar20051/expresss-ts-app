import {Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import {Models} from '../../db/models.js';

export default (sequelize: Sequelize) => {
	class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
		declare id: CreationOptional<string>;
		declare companyId: ForeignKey<string>;
		declare name: string;
		declare sku: string;
		declare productType: 'solid' | 'liquid';
		declare description: string | null;
		declare basePrice: number;
		declare createdAt: CreationOptional<Date>;
		declare updatedAt: CreationOptional<Date>;
		declare deletedAt: CreationOptional<Date | null>;
		declare modifiedByUserId: ForeignKey<string> | null;

		static associate(models: Models) {
			Product.belongsTo(models.Company, {
				foreignKey: 'companyId',
				as: 'company',
			});

			Product.belongsTo(models.User, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedBy',
			});

			Product.hasMany(models.OrderItem, {
				foreignKey: 'productId',
				as: 'orderItems',
			});
		}
	}

	Product.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			companyId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			sku: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
			},
			productType: {
				type: DataTypes.ENUM('solid', 'liquid'),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			basePrice: {
				type: DataTypes.DECIMAL(12, 2),
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			modifiedByUserId: {
				type: DataTypes.UUID,
				allowNull: false,
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
		},
		{
			sequelize,
			modelName: 'Product',
			tableName: 'Product',
			timestamps: true,
			paranoid: true,
		}
	);

	return Product;
};
