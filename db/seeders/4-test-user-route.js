module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('UserRoutes', [
      {
        user_id: 1,
        route_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        route_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        route_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        route_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UserRoutes', null, {});
  },
};
