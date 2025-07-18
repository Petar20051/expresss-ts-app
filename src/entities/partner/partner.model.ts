import {Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import {Models} from '../../db/modelsInit.js';

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
		declare modifiedByUserId: ForeignKey<string>;

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
			type: {
				type: DataTypes.ENUM('customer', 'supplier'),
				allowNull: false,
				field: 'type',
			},
			email: {
				type: DataTypes.STRING(150),
				allowNull: true,
				field: 'email',
			},
			phone: {
				type: DataTypes.STRING(20),
				allowNull: true,
				field: 'phone',
			},
			address: {
				type: DataTypes.TEXT,
				allowNull: true,
				field: 'address',
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
			modelName: 'Partner',
			tableName: 'Partner',
			timestamps: true,
			paranoid: true,
		}
	);

	return Partner;
};
