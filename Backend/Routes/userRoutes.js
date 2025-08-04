const express = require('express');
const router = express.Router();
const userRoutes = require('../controllers/user.Controller.js');
const authenticateToken = require('../Middleware/authMiddleware');

router.get('/', authenticateToken ,userRoutes.getAllUsers); 
router.get('/:id', authenticateToken , userRoutes.getUserById); 

module.exports = router;