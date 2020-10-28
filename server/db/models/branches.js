'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branches extends Model {
    static associate(models) {
      Branches.hasOne(models.Prompt, {
        foreignKey: 'branchesId',
      });
    }
  }
  Branches.init(
    {
      north: DataTypes.STRING,
      east: DataTypes.STRING,
      south: DataTypes.STRING,
      west: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Branches',
    }
  );
  return Branches;
};
