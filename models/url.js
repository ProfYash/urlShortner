'use strict';
const { v4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class url extends Model {

    static associate(models) {
      
    }
  }
  url.init({
    shortURL: DataTypes.STRING,
    longURL: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'url',
    tableName: 'urls',
    underscored: false,
    paranoid: true
  });
  url.beforeCreate(url => url.id = v4());
  return url;
};