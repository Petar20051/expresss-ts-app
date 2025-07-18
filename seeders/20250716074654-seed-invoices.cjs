'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existing = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "invoice";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (parseInt(existing[0].count) > 0) {
      console.log('Invoices already exist, skipping seeding...');
      return;
    }

    await queryInterface.bulkInsert('invoice', [
      {
        id: '9c0a327f-df56-4c89-b6fa-73a31df7a91f',
        invoiceNumber: 1,
        orderId: 'a1f7c4ae-2e1c-41fd-820a-49c0f0707aa1',
        status: 'unpaid',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '30e4b7a2-95bc-4c88-bf5b-fdf1a2a37a96',
      },
      {
        id: 'ed8c835b-95c4-4ed2-8c95-8701de4a6fa6',
        invoiceNumber: 2,
        orderId: 'c31b14d4-8477-42c3-931c-318ff3e3b119',
        status: 'paid',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '5f6ad5d0-f81d-4e33-931c-cc86e63a9c7d',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('invoice', null, {});
  },
};
