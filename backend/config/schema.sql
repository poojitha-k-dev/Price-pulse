CREATE DATABASE IF NOT EXISTS grocery_compare;
USE grocery_compare;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  pincode VARCHAR(20),
  city VARCHAR(100),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS search_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  query VARCHAR(255) NOT NULL,
  searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS saved_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  icon VARCHAR(10),
  image_url VARCHAR(500),
  description TEXT,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  category_id INT NOT NULL,
  image_url VARCHAR(500),
  unit VARCHAR(100),
  brand VARCHAR(255),
  description TEXT,
  blinkit_price DECIMAL(10,2),
  blinkit_mrp DECIMAL(10,2),
  blinkit_discount INT DEFAULT 0,
  blinkit_rating DECIMAL(3,1),
  blinkit_delivery_time VARCHAR(50),
  blinkit_url VARCHAR(500),
  blinkit_available BOOLEAN DEFAULT TRUE,
  zepto_price DECIMAL(10,2),
  zepto_mrp DECIMAL(10,2),
  zepto_discount INT DEFAULT 0,
  zepto_rating DECIMAL(3,1),
  zepto_delivery_time VARCHAR(50),
  zepto_url VARCHAR(500),
  zepto_available BOOLEAN DEFAULT TRUE,
  swiggy_price DECIMAL(10,2),
  swiggy_mrp DECIMAL(10,2),
  swiggy_discount INT DEFAULT 0,
  swiggy_rating DECIMAL(3,1),
  swiggy_delivery_time VARCHAR(50),
  swiggy_url VARCHAR(500),
  swiggy_available BOOLEAN DEFAULT TRUE,
  is_deal_of_day BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_deal ON products(is_deal_of_day);
