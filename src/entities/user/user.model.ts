import {Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import type {Models} from '../../db/models.init.js';

export default (sequelize: Sequelize) => {
	class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
		declare id: CreationOptional<string>;
		declare companyId: ForeignKey<string>;
		declare fullName: string;
		declare email: string;
		declare createdAt: CreationOptional<Date>;
		declare updatedAt: CreationOptional<Date>;
		declare deletedAt: CreationOptional<Date | null>;
		declare modifiedByUserId: ForeignKey<string> | null;

		static associate(models: Models) {
			User.belongsTo(models.Company, {
				foreignKey: 'companyId',
				as: 'company',
			});

			User.belongsTo(models.User, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedBy',
			});

			User.hasMany(models.Company, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedCompanies',
			});

			User.hasMany(models.User, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedUsers',
			});

			User.hasMany(models.Warehouse, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedWarehouses',
			});

			User.hasMany(models.Product, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedProducts',
			});

			User.hasMany(models.Partner, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedPartners',
			});

			User.hasMany(models.Order, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedOrders',
			});

			User.hasMany(models.OrderItem, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedOrderItems',
			});

			User.hasMany(models.Invoice, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedInvoices',
			});
		}
	}

	User.init(
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
			fullName: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(150),
				allowNull: false,
				unique: true,
			},
			modifiedByUserId: {
				type: DataTypes.UUID,
				allowNull: true,
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
			modelName: 'User',
			tableName: 'User',
			timestamps: true,
			paranoid: true,
		}
	);

	return User;
};
