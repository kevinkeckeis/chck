'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        username: 'smithy',
        email: 'john.smith@gmail.com',
        password: '123456',
        firstName: 'John',
        lastName: 'Smith',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        username: 'kex',
        email: 'kevin.keckeis@gmail.com',
        password: '123456',
        firstName: 'Kevin',
        lastName: 'Keckeis',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
