const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');

// Protect this route
router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, welcome to the dashboard!` });
});

module.exports = router;