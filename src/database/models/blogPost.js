'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  published: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  updated: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: new Date()
  }
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', attributes, {
    timestamps: false
  })

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
  }

  return BlogPost;
};