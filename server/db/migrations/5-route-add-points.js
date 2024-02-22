'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Routes', 'first_point', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Routes', 'second_point', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('Routes', 'first_point'),
      queryInterface.removeColumn('Routes', 'second_point'),
    ]);
  },
};
