const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  pincode: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  lat: { type: DataTypes.FLOAT },
  lng: { type: DataTypes.FLOAT },
  savedProducts: { type: DataTypes.JSON, defaultValue: [] },
  searchHistory: { type: DataTypes.JSON, defaultValue: [] }
}, { tableName: 'users', timestamps: true });

module.exports = User;
