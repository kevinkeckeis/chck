'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    getFullname() {
      return [this.firstName, this.lastName].join(' ');
    }
    isValidPassword(rawPassword, cb) {
      bcrypt.compare(rawPassword, this.password, function (err, same) {
        if (err) {
          cb(err);
        }
        cb(null, same);
      });
    }

    static associate(models) {
      this.hasMany(models.Category);
      this.hasMany(models.Checklist);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        // allowNull: false,
      },
      username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userRole: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });
  return User;
};
