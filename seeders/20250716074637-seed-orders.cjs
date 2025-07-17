'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existing = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "Order";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (parseInt(existing[0].count) > 0) {
      console.log('Orders already exist, skipping seeding...');
      return;
    }

    await queryInterface.bulkInsert('Order', [
      {
        id: 'a1f7c4ae-2e1c-41fd-820a-49c0f0707aa1',
        companyId: 'e5adcec8-9fd6-4391-8d24-b7631a34eae3',
        orderType: 'shipment',
        partnerId: 'd1f7c9ae-2e1c-41fd-820a-49c0f0707ba1',
        warehouseId: 'b2eb9246-f6f6-42a2-8e24-145225fbba91',
        notes: 'Urgent shipment of 50 units',
        date: new Date('2025-07-01T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '30e4b7a2-95bc-4c88-bf5b-fdf1a2a37a96',
      },
      {
        id: 'c31b14d4-8477-42c3-931c-318ff3e3b119',
        companyId: 'f3bbaf62-47cf-4225-a1b6-2a6c9f0b3847',
        orderType: 'delivery',
        partnerId: 'f31b14d4-8477-42c3-931c-318ff3e3b117',
        warehouseId: 'd3159a91-3f3d-4a70-913f-b4f130deef3e',
        notes: 'Delivery for warehouse restock',
        date: new Date('2025-07-03T14:30:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '5f6ad5d0-f81d-4e33-931c-cc86e63a9c7d',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Order', null, {});
  },
};
