const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// GET /api/products/categories
router.get('/categories', async (req, res) => {
  try {
    const [cats] = await pool.query('SELECT * FROM categories ORDER BY sort_order ASC');
    res.json(cats);
  } catch (err) {
    console.error('Categories error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/products/special/deals  — MUST be before /:id
router.get('/special/deals', async (req, res) => {
  try {
    const [products] = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug, c.icon as category_icon
       FROM products p JOIN categories c ON p.category_id = c.id
       WHERE p.is_deal_of_day = TRUE ORDER BY RAND() LIMIT 12`
    );
    res.json(products);
  } catch (err) {
    console.error('Deals error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/products/search
router.get('/search', async (req, res) => {
  const { q, category, sort, page = 1, limit = 24 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    let where = '1=1';
    const params = [];

    if (q && q.trim()) {
      where += ' AND (p.name LIKE ? OR p.brand LIKE ?)';
      params.push(`%${q.trim()}%`, `%${q.trim()}%`);
    }
    if (category && category.trim()) {
      where += ' AND c.slug = ?';
      params.push(category.trim());
    }

    let orderBy = 'LEAST(p.blinkit_price, p.zepto_price, p.swiggy_price) ASC';
    if (sort === 'discount') orderBy = 'GREATEST(p.blinkit_discount, p.zepto_discount, p.swiggy_discount) DESC';
    else if (sort === 'rating') orderBy = 'GREATEST(p.blinkit_rating, p.zepto_rating, p.swiggy_rating) DESC';
    else if (sort === 'name') orderBy = 'p.name ASC';

    const [products] = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug, c.icon as category_icon,
       LEAST(p.blinkit_price, p.zepto_price, p.swiggy_price) as min_price
       FROM products p JOIN categories c ON p.category_id = c.id
       WHERE ${where} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) as total FROM products p JOIN categories c ON p.category_id = c.id WHERE ${where}`,
      params
    );

    // Log search history if user is logged in
    if (q && req.headers.authorization) {
      try {
        const jwt = require('jsonwebtoken');
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        await pool.query(
          'INSERT INTO search_history (user_id, query) VALUES (?, ?)',
          [decoded.id, q.trim()]
        );
      } catch (_) { /* ignore auth errors on search log */ }
    }

    res.json({ products, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    console.error('Search error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/products/category/:slug
router.get('/category/:slug', async (req, res) => {
  const { slug } = req.params;
  const { page = 1, limit = 24, sort = 'price', minPrice, maxPrice } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    let where = 'c.slug = ?';
    const params = [slug];

    if (minPrice) { where += ' AND LEAST(p.blinkit_price,p.zepto_price,p.swiggy_price) >= ?'; params.push(Number(minPrice)); }
    if (maxPrice) { where += ' AND LEAST(p.blinkit_price,p.zepto_price,p.swiggy_price) <= ?'; params.push(Number(maxPrice)); }

    let orderBy = 'LEAST(p.blinkit_price, p.zepto_price, p.swiggy_price) ASC';
    if (sort === 'discount') orderBy = 'GREATEST(p.blinkit_discount, p.zepto_discount, p.swiggy_discount) DESC';
    else if (sort === 'rating') orderBy = 'GREATEST(p.blinkit_rating, p.zepto_rating, p.swiggy_rating) DESC';
    else if (sort === 'name') orderBy = 'p.name ASC';

    const [products] = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug, c.icon as category_icon
       FROM products p JOIN categories c ON p.category_id = c.id
       WHERE ${where} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) as total FROM products p JOIN categories c ON p.category_id = c.id WHERE ${where}`,
      params
    );

    const [[category]] = await pool.query('SELECT * FROM categories WHERE slug = ?', [slug]);

    res.json({ products, total, category, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    console.error('Category error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/products/:id  — MUST be last
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid product ID' });
  try {
    const [[product]] = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug, c.icon as category_icon
       FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ?`,
      [id]
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Product detail error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
