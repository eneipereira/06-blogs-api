'use strict';

const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  displayName: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  image: DataTypes.STRING
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const User = sequelize.define('User', attributes)

  return User;
};