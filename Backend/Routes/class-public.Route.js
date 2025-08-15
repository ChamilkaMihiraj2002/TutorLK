// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const classController = require('../Controllers/classController');

// Routes
router.post('/', classController.createClass);                  // Create a new class
router.get('/all', classController.getClasses);                 // Get all classes
router.get('/user/:userId', classController.getClassesByUser);  // Get classes by user ID

module.exports = router;