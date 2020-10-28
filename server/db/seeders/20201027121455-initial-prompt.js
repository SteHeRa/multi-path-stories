'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Prompts', [
      {
        prompt: 'Once upon a time, there was a big bad wolf.',
        createdAt: new Date(),
        updatedAt: new Date(),
        branchesId: 1,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Prompts', null, {});
  },
};
