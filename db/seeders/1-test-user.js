module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Alex',
        email: '1@1',
        password: '$2b$10$dGET7zPYfWZYoImpK1/DW.K25lgY1dhc65L5LI9Eb7Pd1ABJ2a1my',
        honor: 5.2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mary',
        email: '2@2',
        password: '$2b$10$dGET7zPYfWZYoImpK1/DW.K25lgY1dhc65L5LI9Eb7Pd1ABJ2a1my',
        honor: 1.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'John',
        email: '3@3',
        password: '$2b$10$dGET7zPYfWZYoImpK1/DW.K25lgY1dhc65L5LI9Eb7Pd1ABJ2a1my',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Eva',
        email: '4@4.com',
        password: '$2b$10$dGET7zPYfWZYoImpK1/DW.K25lgY1dhc65L5LI9Eb7Pd1ABJ2a1my',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
