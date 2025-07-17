'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existing = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "OrderItem";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (parseInt(existing[0].count) > 0) {
      console.log('OrderItems already exist, skipping seeding...');
      return;
    }

    await queryInterface.bulkInsert('OrderItem', [
      {
        id: '8e2d43b9-2bdf-4c2d-9ea6-1d5f96f30b11',
        orderId: 'a1f7c4ae-2e1c-41fd-820a-49c0f0707aa1',
        productId: '1e2a3379-d2d1-4ae2-9673-33c3449f7bb1',
        quantity: 50,
        unitPrice: 15.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '30e4b7a2-95bc-4c88-bf5b-fdf1a2a37a96',
      },
      {
        id: '72c305c2-e360-46c3-a5bb-6c2d20271a44',
        orderId: 'c31b14d4-8477-42c3-931c-318ff3e3b119',
        productId: '2c148260-34e9-4e31-9586-028c5f00e0f2',
        quantity: 80,
        unitPrice: 22.75,
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '5f6ad5d0-f81d-4e33-931c-cc86e63a9c7d',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('OrderItem', null, {});
  },
};
