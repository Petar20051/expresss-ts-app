'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingUsers = await queryInterface.sequelize.query(
      'SELECT COUNT(*) AS count FROM "User";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (parseInt(existingUsers[0].count) > 0) {
      console.log('Users already exist, skipping seeding...');
      return;
    }

    await queryInterface.bulkInsert('User', [
      {
        id: '30e4b7a2-95bc-4c88-bf5b-fdf1a2a37a96',
        companyId: 'e5adcec8-9fd6-4391-8d24-b7631a34eae3',
        fullName: 'Petar Petrov',
        email: 'petar@techsup.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5f6ad5d0-f81d-4e33-931c-cc86e63a9c7d',
        companyId: 'e5adcec8-9fd6-4391-8d24-b7631a34eae3',
        fullName: 'Maria Ivanova',
        email: 'maria@techsup.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f7a62e51-21e2-4c26-9179-882f90ea9f01',
        companyId: 'f3bbaf62-47cf-4225-a1b6-2a6c9f0b3847',
        fullName: 'Ivan Dimitrov',
        email: 'ivan@globaltraders.io',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
