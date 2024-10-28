```javascript
const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('new_todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    try {
      const dbUser = await User.findOne({ where: { id: user.id } });
      if (!dbUser) return res.status(404).json({ message: 'User not found' });

      req.user = dbUser;
      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
};
```