module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Routes', [
      {
        title: 'Route11',
        description: 'Description for Route11',
        city: 'Moscow',
        start: 'Red Square',
        finish: 'Arbat',
        longway: 5.7,
        user_id: 1,
        rating: 2.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Route22',
        description: 'Description for Route22',
        city: 'Izobilny',
        start: 'Lenin Square',
        finish: 'Central Park',
        longway: 0.8,
        user_id: 2,
        rating: 0.2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Route33',
        description: 'Description for Route33',
        city: 'Saint-Petersburg',
        start: 'The Bronze Horseman',
        finish: 'Nevsky Prospekt',
        longway: 4.1,
        rating: 3.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Route44',
        description: 'Description for Route44',
        city: 'Kislovodsk',
        start: 'Narzan Gallery',
        finish: 'Ginal Sanatorium',
        longway: 6.1,
        rating: 1.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Routes', null, {});
  },
};
