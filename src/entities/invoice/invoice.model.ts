import {Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import {Models} from '../../db/modelsInit.js';

export default (sequelize: Sequelize) => {
	class Invoice extends Model<InferAttributes<Invoice>, InferCreationAttributes<Invoice>> {
		declare id: CreationOptional<string>;
		declare invoiceNumber: string;
		declare orderId: ForeignKey<string>;
		declare status: 'unpaid' | 'paid' | 'overdue';
		declare date: CreationOptional<Date>;
		declare createdAt: CreationOptional<Date>;
		declare updatedAt: CreationOptional<Date>;
		declare deletedAt: CreationOptional<Date | null>;
		declare modifiedByUserId: ForeignKey<string>;

		static associate(models: Models) {
			Invoice.belongsTo(models.Order, {
				foreignKey: 'orderId',
				as: 'order',
			});

			Invoice.belongsTo(models.User, {
				foreignKey: 'modifiedByUserId',
				as: 'modifiedBy',
			});
		}
	}

	Invoice.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				field: 'id',
			},
			invoiceNumber: {
				type: DataTypes.STRING(50),
				field: 'invoiceNumber',
				autoIncrement: true,
			},
			orderId: {
				type: DataTypes.UUID,
				allowNull: false,
				field: 'orderId',
			},
			status: {
				type: DataTypes.ENUM('unpaid', 'paid', 'overdue'),
				allowNull: false,
				field: 'status',
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
			modelName: 'Invoice',
			tableName: 'Invoice',
			timestamps: true,
			paranoid: true,
		}
	);

	return Invoice;
};
