'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PopupHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PopupHistory.belongsTo(models.WatchingHistory, {
        foreignKey: "watchingId",
        as: "watchHistory",
      });

    }
  };
  PopupHistory.init({
    watchingId: DataTypes.INTEGER,
    isClicked: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'PopupHistory',
    timestamps: true
  });
  return PopupHistory;
};
