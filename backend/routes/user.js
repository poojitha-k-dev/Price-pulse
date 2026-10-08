const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const auth = require('../middleware/auth');

// GET /api/user/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const [[user]] = await pool.query(
      'SELECT id, name, email, pincode, city, latitude, longitude, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Profile error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/user/profile
router.put('/profile', auth, async (req, res) => {
  const { name, pincode, city } = req.body;
  try {
    await pool.query(
      'UPDATE users SET name=?, pincode=?, city=? WHERE id=?',
      [name, pincode, city, req.user.id]
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/user/location
router.put('/location', auth, async (req, res) => {
  const { pincode, city, latitude, longitude } = req.body;
  try {
    await pool.query(
      'UPDATE users SET pincode=?, city=?, latitude=?, longitude=? WHERE id=?',
      [pincode || null, city || null, latitude || null, longitude || null, req.user.id]
    );
    res.json({ message: 'Location updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/user/save-product/:productId
router.post('/save-product/:productId', auth, async (req, res) => {
  const { productId } = req.params;
  try {
    const [[existing]] = await pool.query(
      'SELECT id FROM saved_products WHERE user_id=? AND product_id=?',
      [req.user.id, productId]
    );
    if (existing) {
      await pool.query('DELETE FROM saved_products WHERE user_id=? AND product_id=?', [req.user.id, productId]);
      return res.json({ saved: false, message: 'Removed from saved' });
    }
    await pool.query('INSERT INTO saved_products (user_id, product_id) VALUES (?, ?)', [req.user.id, productId]);
    res.json({ saved: true, message: 'Product saved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/user/saved
router.get('/saved', auth, async (req, res) => {
  try {
    const [products] = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug, c.icon as category_icon, sp.saved_at
       FROM saved_products sp
       JOIN products p ON sp.product_id = p.id
       JOIN categories c ON p.category_id = c.id
       WHERE sp.user_id = ? ORDER BY sp.saved_at DESC`,
      [req.user.id]
    );
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/user/search-history
router.get('/search-history', auth, async (req, res) => {
  try {
    const [history] = await pool.query(
      'SELECT * FROM search_history WHERE user_id=? ORDER BY searched_at DESC LIMIT 20',
      [req.user.id]
    );
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
