'use strict';

const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: DataTypes.STRING
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const Category = sequelize.define('Category', attributes, {
    timestamps: false
  })

  return Category;
};