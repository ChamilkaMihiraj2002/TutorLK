const express = require('express');
const router = express.Router();
const classController = require('../Controllers/classController');

// GET all classes
router.get('/', classController.getAllClasses);

// Other routes...

module.exports = router;