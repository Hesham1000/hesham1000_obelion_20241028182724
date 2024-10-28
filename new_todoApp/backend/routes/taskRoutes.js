```javascript
const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes, Model } = require('sequelize');

// Database connection
const sequelize = new Sequelize('new_todoApp', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

// Define Task model
class Task extends Model {}
Task.init({
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

// Import controllers
const taskController = require('../controllers/taskController');

// API endpoints
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await taskController.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.post('/tasks', async (req, res) => {
  try {
    const task = await taskController.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await taskController.updateTask(req.params.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    await taskController.deleteTask(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
```