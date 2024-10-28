```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TaskModel = sequelize.define('tasks', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  priority: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Low'
  }
}, {
  timestamps: false
});

module.exports = TaskModel;
```