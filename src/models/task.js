'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('Todo', 'In-progress', 'Done'),
      defaultValue: 'Todo',
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    createdBy: DataTypes.INTEGER,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};