'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUDV4,
        primaryKey: true,
      },
      companyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Company',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      sku: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      productType: {
        type: Sequelize.ENUM('solid', 'liquid'),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      basePrice: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      modifiedByUserId: {
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
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('product');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_product_productType";');
  },
};
