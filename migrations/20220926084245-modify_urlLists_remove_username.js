'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('urlLists', 'userName')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('urlLists', 'userName', {
      type: Sequelize.STRING(50),
      defaultValue: "null",
      allowNull: false,
    })
  },
}
