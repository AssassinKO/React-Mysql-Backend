'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      validate: { isEmail: true },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      defaultValue: 'other',
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'USER') 
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    deletedAt: 'deletedAt',
    hooks: {
      
      beforeCreate: (user, options) => {
        return new Promise((resolve, reject) => {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) { reject(err) }
            return bcrypt.hash(user.password, salt, null, (err, hash) => {
              if (err) { reject(err) }
                user.password = hash
                resolve()
            })
          })
        })
      }

    }
  });

  User.prototype.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return callback(err)
      callback(null, isMatch)
    })
  }

  return User;
};