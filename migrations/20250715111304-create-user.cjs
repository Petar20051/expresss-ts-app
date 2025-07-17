'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('User', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			"companyId": {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Company',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			"fullName": {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(150),
				allowNull: false,
				unique: true,
			},
			"createdAt": {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			"updatedAt": {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			"deletedAt": {
				type: Sequelize.DATE,
				allowNull: true,
			},
			"modifiedByUserId": {
				type: Sequelize.UUID,
				allowNull: true,
				references: {
					model: 'User',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable('User');
	},
};
