'use strict'

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('urlLists', 'isValid')
    await queryInterface.removeColumn('urlLists', 'agency')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('urlLists', 'isValid', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    })
    await queryInterface.addColumn('urlLists', 'agency', {
      type: Sequelize.STRING(50),
      defaultValue: 'null',
    })
  },
}
