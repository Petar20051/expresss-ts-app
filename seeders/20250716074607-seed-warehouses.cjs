'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existing = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "Warehouse";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (parseInt(existing[0].count) > 0) {
      console.log('Warehouses already exist, skipping seeding...');
      return;
    }

    await queryInterface.bulkInsert('warehouse', [
      {
        id: 'b2eb9246-f6f6-42a2-8e24-145225fbba91',
        companyId: 'e5adcec8-9fd6-4391-8d24-b7631a34eae3',
        name: 'Main Tech Warehouse',
        location: 'Varna, Bulgaria',
        supportedType: 'solid',
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '30e4b7a2-95bc-4c88-bf5b-fdf1a2a37a96',
      },
      {
        id: '1dd56d13-3630-49ac-9906-dfa75e5c02e4',
        companyId: 'e5adcec8-9fd6-4391-8d24-b7631a34eae3',
        name: 'Liquid Storage',
        location: 'Sofia, BG',
        supportedType: 'liquid',
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '30e4b7a2-95bc-4c88-bf5b-fdf1a2a37a96',
      },
      {
        id: 'd3159a91-3f3d-4a70-913f-b4f130deef3e',
        companyId: 'f3bbaf62-47cf-4225-a1b6-2a6c9f0b3847',
        name: 'Global Storage',
        location: 'Sofia, Bulgaria',
        supportedType: 'liquid',
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '5f6ad5d0-f81d-4e33-931c-cc86e63a9c7d',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('warehouse', null, {});
  },
};
