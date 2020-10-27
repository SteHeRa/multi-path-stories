'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prompt extends Model {
    static associate(models) {
      Prompt.hasOne(models.Branches, {
        foreignKey: 'id',
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
