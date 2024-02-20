module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Ratings', [
      {
        user_id: 1,
        route_id: 1,
        point: 3,
        comment: 'to slowly',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        route_id: 2,
        point: 4,
        comment: 'my preferred',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        route_id: 3,
        point: 2,
        comment: 'to long',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        route_id: 1,
        point: 5,
        comment: 'super!!!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Ratings', null, {});
  },
};
