require('dotenv').config();
const mysql = require('mysql2/promise');
const categories = require('./categories');
const { generateProductsForCategory } = require('./productGenerator');

async function seed() {
  // Connect without database first to create it
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });

  console.log('✅ Connected to MySQL');
  console.log('📂 Creating database and tables...');

  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'grocery_compare'}\``);
  await conn.query(`USE \`${process.env.DB_NAME || 'grocery_compare'}\``);

  await conn.query(`
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

    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      icon VARCHAR(20),
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

    CREATE TABLE IF NOT EXISTS saved_products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      product_id INT,
      saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS search_history (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      query VARCHAR(255) NOT NULL,
      searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  console.log('✅ Tables ready');

  // Clear existing data
  await conn.query('SET FOREIGN_KEY_CHECKS = 0');
  await conn.query('TRUNCATE TABLE saved_products');
  await conn.query('TRUNCATE TABLE search_history');
  await conn.query('TRUNCATE TABLE products');
  await conn.query('TRUNCATE TABLE categories');
  await conn.query('SET FOREIGN_KEY_CHECKS = 1');

  console.log('📂 Inserting 50 categories...');
  const catIds = {};
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const [result] = await conn.query(
      'INSERT INTO categories (name, slug, icon, description, sort_order) VALUES (?, ?, ?, ?, ?)',
      [cat.name, cat.slug, cat.icon, cat.description, i + 1]
    );
    catIds[cat.slug] = result.insertId;
  }
  console.log(`✅ ${categories.length} categories inserted`);

  console.log('📦 Seeding products (500 per category)...');
  let total = 0;

  for (const cat of categories) {
    const catId = catIds[cat.slug];
    const products = generateProductsForCategory(cat.slug, cat.name, 500);
    const batchSize = 100;

    for (let b = 0; b < products.length; b += batchSize) {
      const batch = products.slice(b, b + batchSize);
      const values = batch.map(p => [
        p.name, catId, p.image_url, p.unit, p.brand,
        p.blinkit_price, p.blinkit_mrp, p.blinkit_discount, p.blinkit_rating, p.blinkit_delivery_time, p.blinkit_url, true,
        p.zepto_price, p.zepto_mrp, p.zepto_discount, p.zepto_rating, p.zepto_delivery_time, p.zepto_url, true,
        p.swiggy_price, p.swiggy_mrp, p.swiggy_discount, p.swiggy_rating, p.swiggy_delivery_time, p.swiggy_url, true,
        p.is_deal_of_day
      ]);

      await conn.query(
        `INSERT INTO products
         (name, category_id, image_url, unit, brand,
          blinkit_price, blinkit_mrp, blinkit_discount, blinkit_rating, blinkit_delivery_time, blinkit_url, blinkit_available,
          zepto_price, zepto_mrp, zepto_discount, zepto_rating, zepto_delivery_time, zepto_url, zepto_available,
          swiggy_price, swiggy_mrp, swiggy_discount, swiggy_rating, swiggy_delivery_time, swiggy_url, swiggy_available,
          is_deal_of_day)
         VALUES ?`,
        [values]
      );
      total += batch.length;
    }
    process.stdout.write(`\r  ✓ ${cat.name}: 500 products | Total so far: ${total}`);
  }

  console.log(`\n\n✅ SEED COMPLETE!`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Products: ${total}`);
  console.log('\n🚀 Now run: npm run dev');
  
  await conn.end();
  process.exit(0);
}

seed().catch(err => {
  console.error('\n❌ Seed failed:', err.message);
  if (err.code === 'ECONNREFUSED') {
    console.error('   MySQL is not running. Start it first.');
  } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
    console.error('   Wrong MySQL credentials. Check your .env file.');
    console.error('   Current: user=' + (process.env.DB_USER || 'root'));
  }
  process.exit(1);
});
