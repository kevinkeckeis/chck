'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class checklist extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsToMany(models.Category, { through: 'CategoriesChecklists' });
      this.hasMany(models.ChecklistItem);
    }
  }
  checklist.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      isFavorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Checklist',
    }
  );
  return checklist;
};
