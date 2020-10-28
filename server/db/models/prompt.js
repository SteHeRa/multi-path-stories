'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prompt extends Model {
    static associate(models) {
      Prompt.belongsTo(models.Branches, {
        foreignKey: 'id',
        allowNull: false,
      });
    }
  }
  Prompt.init(
    {
      prompt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Prompt',
    }
  );
  return Prompt;
};
