'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderItem', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      "orderId": {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Order',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      "productId": {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      "unitPrice": {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      "createdAt": {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      "updatedAt": {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      "deletedAt": {
        type: Sequelize.DATE,
      },
      "modifiedByUserId": {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });

    await queryInterface.addConstraint('OrderItem', {
      fields: ['orderId', 'productId'],
      type: 'unique',
      name: 'unique_order_product',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('OrderItem');
  },
};
