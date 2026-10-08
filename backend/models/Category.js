const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  icon: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT }
}, { tableName: 'categories', timestamps: false });

module.exports = Category;
