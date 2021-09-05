'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WatchingHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WatchingHistory.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      })
      WatchingHistory.belongsTo(models.Video, {
        foreignKey: 'videoId',
        as: 'video',
        onDelete: 'CASCADE',
      })

      WatchingHistory.hasMany(models.PopupHistory, {
        foreignKey: 'watchingId',
        as: 'popupHistories',
        onDelete: 'CASCADE',
      })
    }
  };
  WatchingHistory.init({
    userId: {
      type: DataTypes.INTEGER,
    },
    videoId: DataTypes.INTEGER,
    isFinished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'WatchingHistory',
    timestamps: true
  });
  return WatchingHistory;
};
