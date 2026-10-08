#!/bin/bash
echo "============================================"
echo "  PricePulse - Complete Setup Script"
echo "============================================"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

DB_USER="root"
DB_PASS="Potti21@"
DB_NAME="grocery_compare"

echo -e "\n${YELLOW}Step 1: Creating MySQL database...${NC}"
mysql -u "$DB_USER" -p"$DB_PASS" -e "
CREATE DATABASE IF NOT EXISTS $DB_NAME;
USE $DB_NAME;

DROP TABLE IF EXISTS saved_products;
DROP TABLE IF EXISTS search_history;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
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

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  icon VARCHAR(20),
  description TEXT,
  sort_order INT DEFAULT 0
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  category_id INT NOT NULL,
  image_url VARCHAR(500),
  unit VARCHAR(100),
  brand VARCHAR(255),
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

CREATE TABLE saved_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE search_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  query VARCHAR(255) NOT NULL,
  searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_name ON products(name(100));
" 2>&1

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Database created successfully!${NC}"
else
  echo -e "${RED}❌ Database creation failed. Check your MySQL credentials.${NC}"
  exit 1
fi

echo -e "\n${YELLOW}Step 2: Installing backend dependencies...${NC}"
cd "$(dirname "$0")/backend"
npm install
echo -e "${GREEN}✅ Backend dependencies installed!${NC}"

echo -e "\n${YELLOW}Step 3: Seeding database (50 categories, 500+ products each)...${NC}"
echo "This may take 2-3 minutes..."
node data/seed.js

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Database seeded successfully!${NC}"
else
  echo -e "${RED}❌ Seeding failed.${NC}"
  exit 1
fi

echo -e "\n${YELLOW}Step 4: Installing frontend dependencies...${NC}"
cd ../frontend
npm install
echo -e "${GREEN}✅ Frontend dependencies installed!${NC}"

echo -e "\n${GREEN}============================================"
echo "  ✅ Setup Complete!"
echo "============================================${NC}"
echo ""
echo "To start the app, open TWO terminals:"
echo ""
echo "  Terminal 1 (Backend):"
echo "    cd backend && npm run dev"
echo ""
echo "  Terminal 2 (Frontend):"
echo "    cd frontend && npm start"
echo ""
echo "Then open: http://localhost:3000"
