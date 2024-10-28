```javascript
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { User } = require('../models'); // Import User model

// User Registration Endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password, User); // Pass User model
    res.status(201).json({ message: 'Account successfully created', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User Login Endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password, User); // Pass User model
    res.status(200).json({ message: 'Logged in successfully', user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
```

```javascript
// new_todoApp/backend/models/user.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
```