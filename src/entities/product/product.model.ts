import {Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import {Models} from '../../db/models.init.js';

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
		declare modifiedByUserId: ForeignKey<string>;

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
				field: 'id',
			},
			companyId: {
				type: DataTypes.UUID,
				allowNull: false,
				field: 'companyId',
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
				field: 'name',
			},
			sku: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
				field: 'sku',
			},
			productType: {
				type: DataTypes.ENUM('solid', 'liquid'),
				allowNull: false,
				field: 'productType',
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
				field: 'description',
			},
			basePrice: {
				type: DataTypes.DECIMAL(12, 2),
				allowNull: false,
				validate: {
					min: 0,
				},
				field: 'basePrice',
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
			modelName: 'Product',
			tableName: 'Product',
			timestamps: true,
			paranoid: true,
		}
	);

	return Product;
};
