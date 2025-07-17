import {Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import {Models} from '../../db/models.js';

export default (sequelize: Sequelize) => {
	class Partner extends Model<InferAttributes<Partner>, InferCreationAttributes<Partner>> {
		declare id: CreationOptional<string>;
		declare companyId: ForeignKey<string>;
		declare name: string;
		declare type: 'customer' | 'supplier';
		declare email: string | null;
		declare phone: string | null;
		declare address: string | null;
		declare createdAt: CreationOptional<Date>;
		declare updatedAt: CreationOptional<Date>;
		declare deletedAt: CreationOptional<Date | null>;
		declare modifiedByUserId: ForeignKey<string> | null;

		static associate(models: Models) {
			Partner.belongsTo(models.Company, {
				foreignKey: 'companyId',
				as: 'company',
			});

			Partner.belongsTo(models.User, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedBy',
			});

			Partner.hasMany(models.Order, {
				foreignKey: 'partnerId',
				as: 'orders',
			});
		}
	}

	Partner.init(
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
			type: {
				type: DataTypes.ENUM('customer', 'supplier'),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(150),
				allowNull: true,
			},
			phone: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			address: {
				type: DataTypes.TEXT,
				allowNull: true,
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
			modelName: 'Partner',
			tableName: 'Partner',
			timestamps: true,
			paranoid: true,
		}
	);

	return Partner;
};
