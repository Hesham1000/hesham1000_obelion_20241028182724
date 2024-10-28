```javascript
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Assuming models directory has User model

const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  verifyPassword,
  User // Exporting User model
};
```

Ensure the `User` model is defined in `models` directory, matching the `users` table structure from the database schema.