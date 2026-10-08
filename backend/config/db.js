require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'grocery_compare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL Connected:', process.env.DB_NAME || 'grocery_compare');
    conn.release();
  } catch (err) {
    console.error('❌ MySQL connection error:', err.message);
    throw err;
  }
};

module.exports = { pool, connectDB };
