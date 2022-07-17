'use strict';

module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').DataTypes} DataTypes 
   */
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('PostCategories', {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'BlogPosts',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onDelete: 'cascade'
      }
    });
  },

  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  }
};
