'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('urlLists', 'urlState', {
      type: Sequelize.STRING,
      defaultValue: 'certificating',
      allowNull: false,
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('urlLists', 'urlState')
  },
}
