'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('invoice', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      invoiceNumber: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      }
      ,
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Order',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM('unpaid', 'paid', 'overdue'),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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
    await queryInterface.dropTable('invoice');
    await queryInterface.sequelize.query(`DROP SEQUENCE IF EXISTS invoice_invoiceNumber_seq;`);
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_invoice_status";');
  },
};
