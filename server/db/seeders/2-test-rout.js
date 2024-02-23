module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Routes',
      [
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
          first_point: '[37.57864743998776,55.72597175559303]',
          second_point: '[37.62276441001721,55.72983841818785]',
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
          first_point: '[37.63563901338291,55.7726904284944]',
          second_point: '[37.65744001071436,55.75974982078323]',
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
          first_point: '[37.584827242615276,55.75208694301421]',
          second_point: '[37.62173443970166,55.75894541644098]',
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
          first_point: '[37.6692846454206,55.73390555233608]',
          second_point: '[37.68524915385615,55.73264905965011]',
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Routes', null, {});
  },
};
