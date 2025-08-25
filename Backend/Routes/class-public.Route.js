// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const classController = require('../Controllers/classController');

router.get('/all', classController.getClasses);                 // Get all classes
router.get('/:userId', classController.getClassesByUser);       // Get classes by user ID

module.exports = router;