const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'sqlite',
});

class Employee extends Model {}

Employee.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.STRING,
  phone: DataTypes.STRING,
  isChecked: DataTypes.BOOLEAN, 
}, { sequelize, modelName: 'employee' });

module.exports = { sequelize, DataTypes, Employee };
