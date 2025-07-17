'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Company', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			emailDomain: {
				type: Sequelize.STRING(100),
				allowNull: false,
				unique: true,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			deletedAt: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			modifiedByUserId: {
				type: Sequelize.UUID,
				allowNull: true,
			},
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable('Company');
	},
};
