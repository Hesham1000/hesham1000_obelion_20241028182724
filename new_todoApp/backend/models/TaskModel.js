```javascript
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/sequelize');

class Task extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Low',
      },
    }, {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: false,
    });
  }
}

module.exports = Task;
```