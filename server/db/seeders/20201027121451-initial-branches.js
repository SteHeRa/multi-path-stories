'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Branches', [
      {
        north: undefined,
        east: undefined,
        south: undefined,
        west: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Branches', null, {});
  },
};
