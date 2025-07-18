'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existing = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "partner";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (parseInt(existing[0].count) > 0) {
      console.log('Partners already exist, skipping seeding...');
      return;
    }

    await queryInterface.bulkInsert('partner', [
      {
        id: 'd1f7c9ae-2e1c-41fd-820a-49c0f0707ba1',
        companyId: 'e5adcec8-9fd6-4391-8d24-b7631a34eae3',
        name: 'Speedy Parts Ltd.',
        type: 'supplier',
        email: 'contact@speedyparts.com',
        phone: '+359 887 123 456',
        address: 'Industrial Zone, Sofia, Bulgaria',
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '30e4b7a2-95bc-4c88-bf5b-fdf1a2a37a96',
      },
      {
        id: 'f31b14d4-8477-42c3-931c-318ff3e3b117',
        companyId: 'f3bbaf62-47cf-4225-a1b6-2a6c9f0b3847',
        name: 'BuildCo Construction',
        type: 'customer',
        email: 'info@buildco.com',
        phone: '+359 876 654 321',
        address: 'Business Park, Varna, Bulgaria',
        createdAt: new Date(),
        updatedAt: new Date(),
        modifiedByUserId: '5f6ad5d0-f81d-4e33-931c-cc86e63a9c7d',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('partner', null, {});
  },
};
