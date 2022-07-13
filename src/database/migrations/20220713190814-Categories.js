'use strict';

module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').DataTypes} DataTypes 
   */
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Categories', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING
    });
  },

  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Categories');
  }
};
