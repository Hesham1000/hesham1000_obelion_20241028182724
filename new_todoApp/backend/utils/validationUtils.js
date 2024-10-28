```javascript
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('new_todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
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
      modelName: 'users', // Matches the table name
      tableName: 'users',
      timestamps: false,
    });
  }
}

module.exports = User;
```