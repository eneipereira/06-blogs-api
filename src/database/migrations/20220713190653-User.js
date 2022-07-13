'use strict';

module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').DataTypes} DataTypes 
   */
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Users', {
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
    })
  },
  
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
