'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class checklistItem extends Model {
    static associate(models) {
      this.belongsTo(models.Checklist);
    }
  }
  checklistItem.init(
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
      isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'ChecklistItem',
    }
  );
  return checklistItem;
};
