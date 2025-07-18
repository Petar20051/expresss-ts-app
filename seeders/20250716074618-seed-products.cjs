'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existing = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "product";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (parseInt(existing[0].count) > 0) {
      console.log('Products already exist, skipping seeding...');
      return;
    }

    await queryInterface.bulkInsert('product', [
      {
        id: '1e2a3379-d2d1-4ae2-9673-33c3449f7bb1',
        companyId: 'e5adcec8-9fd6-4391-8d24-b7631a34eae3',
        name: 'Premium Engine Oil',
        sku: 'ENG-OIL-001',
        productType: 'liquid',
        description: 'High-performance engine oil for all types of vehicles.',
        basePrice: 49.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '30e4b7a2-95bc-4c88-bf5b-fdf1a2a37a96',
      },
      {
        id: '2c148260-34e9-4e31-9586-028c5f00e0f2',
        companyId: 'f3bbaf62-47cf-4225-a1b6-2a6c9f0b3847',
        name: 'Industrial Steel Rod',
        sku: 'STEEL-ROD-099',
        productType: 'solid',
        description: 'Reinforced steel rod used for construction.',
        basePrice: 119.95,
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '5f6ad5d0-f81d-4e33-931c-cc86e63a9c7d',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('product', null, {});
  },
};
