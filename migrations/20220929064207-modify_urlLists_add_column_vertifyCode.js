'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('urlLists', 'verifyCode', {
      type: Sequelize.STRING,
      defaultValue: 'unassigned',
      allowNull: false,
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('urlLists', 'verifyCode')
  },
}
