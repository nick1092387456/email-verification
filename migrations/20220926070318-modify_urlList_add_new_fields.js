'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('urlLists', 'email', {
      type: Sequelize.STRING(64),
      allowNull: false,
    })
    await queryInterface.addColumn('urlLists', 'isValid', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('urlLists', 'email')
    await queryInterface.removeColumn('urlLists', 'isValid')
  },
}
