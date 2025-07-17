'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingCompanies = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "Company";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (parseInt(existingCompanies[0].count) > 0) {
      console.log('Companies already exist, skipping seeding...');
      return;
    }

    await queryInterface.bulkInsert('Company', [
      {
        id: 'e5adcec8-9fd6-4391-8d24-b7631a34eae3',
        name: 'Tech Supplies Ltd.',
        emailDomain: 'techsup.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f3bbaf62-47cf-4225-a1b6-2a6c9f0b3847',
        name: 'Global Traders Inc.',
        emailDomain: 'globaltraders.io',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Company', {
      id: [
        'e5adcec8-9fd6-4391-8d24-b7631a34eae3',
        'f3bbaf62-47cf-4225-a1b6-2a6c9f0b3847',
      ],
    });
  },
};
