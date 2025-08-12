const express = require('express');
const router = express.Router();
const userRoutes = require('../controllers/user.Controller.js');

router.get('/',userRoutes.getAllUsers); 
router.get('/:name', userRoutes.getUserById); 

module.exports = router;