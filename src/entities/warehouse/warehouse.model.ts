import {Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import type {Models} from '../../db/models.init.js';

export default (sequelize: Sequelize) => {
	class Warehouse extends Model<InferAttributes<Warehouse>, InferCreationAttributes<Warehouse>> {
		declare id: CreationOptional<string>;
		declare companyId: ForeignKey<string>;
		declare name: string;
		declare location: string;
		declare supportedType: 'solid' | 'liquid';
		declare createdAt: CreationOptional<Date>;
		declare updatedAt: CreationOptional<Date>;
		declare deletedAt: CreationOptional<Date | null>;
		declare modifiedByUserId: ForeignKey<string>;

		static associate(models: Models) {
			Warehouse.belongsTo(models.Company, {
				foreignKey: 'companyId',
				as: 'company',
			});

			Warehouse.belongsTo(models.User, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedBy',
			});

			Warehouse.hasMany(models.Order, {
				foreignKey: 'warehouseId',
				as: 'orders',
			});
		}
	}

	Warehouse.init(
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
			location: {
				type: DataTypes.TEXT,
				allowNull: false,
				field: 'location',
			},
			supportedType: {
				type: DataTypes.ENUM('solid', 'liquid'),
				allowNull: false,
				field: 'supportedType',
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
			modelName: 'Warehouse',
			tableName: 'Warehouse',
			timestamps: true,
			paranoid: true,
		}
	);

	return Warehouse;
};
