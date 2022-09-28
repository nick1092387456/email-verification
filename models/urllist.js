'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class urlList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  urlList.init(
    {
      shortURL: DataTypes.STRING,
      originURL: DataTypes.STRING,
      agency: DataTypes.STRING,
      email: DataTypes.STRING,
      isValid: DataTypes.BOOLEAN,
      urlState: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'urlList',
    }
  )
  return urlList
}
