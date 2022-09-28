'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('urlLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shortURL: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(7),
      },
      originURL: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(2048),
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      agency: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('urlLists');
  }
};