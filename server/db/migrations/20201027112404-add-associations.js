'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //each prompt has one set of branches
    return queryInterface.addColumn('Prompts', 'branchesId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Branches',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('Prompts', 'branchesId');
  },
};
