```javascript
const { Sequelize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('new_todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'users', // Updated to match the database table name
      tableName: 'users',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    });
  }

  async isValidPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

module.exports = User;
```