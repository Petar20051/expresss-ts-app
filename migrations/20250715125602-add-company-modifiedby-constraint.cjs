'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint('Company', {
      fields: ['modifiedByUserId'],
      type: 'foreign key',
      name: 'fk_company_modified_by',
      references: {
        table: 'User',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('Company', 'fk_company_modified_by');
  }
};
