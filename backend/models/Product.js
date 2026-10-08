const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING },
  categoryId: { type: DataTypes.INTEGER, references: { model: Category, key: 'id' } },
  image: { type: DataTypes.STRING },
  unit: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  tags: { type: DataTypes.JSON, defaultValue: [] },
  // Blinkit
  blinkitPrice: { type: DataTypes.DECIMAL(10, 2) },
  blinkitMrp: { type: DataTypes.DECIMAL(10, 2) },
  blinkitDiscount: { type: DataTypes.INTEGER, defaultValue: 0 },
  blinkitRating: { type: DataTypes.DECIMAL(3, 1) },
  blinkitDelivery: { type: DataTypes.STRING, defaultValue: '10 mins' },
  blinkitUrl: { type: DataTypes.STRING, defaultValue: 'https://blinkit.com' },
  blinkitAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
  // Zepto
  zeptoPrice: { type: DataTypes.DECIMAL(10, 2) },
  zeptoMrp: { type: DataTypes.DECIMAL(10, 2) },
  zeptoDiscount: { type: DataTypes.INTEGER, defaultValue: 0 },
  zeptoRating: { type: DataTypes.DECIMAL(3, 1) },
  zeptoDelivery: { type: DataTypes.STRING, defaultValue: '10 mins' },
  zeptoUrl: { type: DataTypes.STRING, defaultValue: 'https://zeptonow.com' },
  zeptoAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
  // Swiggy Instamart
  swiggyPrice: { type: DataTypes.DECIMAL(10, 2) },
  swiggyMrp: { type: DataTypes.DECIMAL(10, 2) },
  swiggyDiscount: { type: DataTypes.INTEGER, defaultValue: 0 },
  swiggyRating: { type: DataTypes.DECIMAL(3, 1) },
  swiggyDelivery: { type: DataTypes.STRING, defaultValue: '15 mins' },
  swiggyUrl: { type: DataTypes.STRING, defaultValue: 'https://www.swiggy.com/instamart' },
  swiggyAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
  isPopular: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'products', timestamps: false });

Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

module.exports = Product;
