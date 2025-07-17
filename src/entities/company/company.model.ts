import {Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import type {Models} from '../../db/models.js';

export default (sequelize: Sequelize) => {
	class Company extends Model<InferAttributes<Company>, InferCreationAttributes<Company>> {
		declare id: CreationOptional<string>;
		declare name: string;
		declare emailDomain: string;
		declare createdAt: CreationOptional<Date>;
		declare updatedAt: CreationOptional<Date>;
		declare deletedAt: CreationOptional<Date | null>;
		declare modifiedByUserId: ForeignKey<string> | null;

		static associate(models: Models) {
			Company.belongsTo(models.User, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedBy',
			});

			Company.hasMany(models.User, {
				foreignKey: 'companyId',
				as: 'users',
			});

			Company.hasMany(models.Warehouse, {
				foreignKey: 'companyId',
				as: 'warehouses',
			});

			Company.hasMany(models.Product, {
				foreignKey: 'companyId',
				as: 'products',
			});

			Company.hasMany(models.Partner, {
				foreignKey: 'companyId',
				as: 'partners',
			});

			Company.hasMany(models.Order, {
				foreignKey: 'companyId',
				as: 'orders',
			});
		}
	}

	Company.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			emailDomain: {
				type: DataTypes.STRING(100),
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
			modelName: 'Company',
			tableName: 'Company',
			timestamps: true,
			paranoid: true,
		}
	);

	return Company;
};
