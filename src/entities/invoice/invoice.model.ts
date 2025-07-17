import {Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import {Models} from '../../db/models.js';

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
		declare modifiedByUserId: ForeignKey<string> | null;

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
			},
			invoiceNumber: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
			},
			orderId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM('unpaid', 'paid', 'overdue'),
				allowNull: false,
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
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
				allowNull: true,
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
