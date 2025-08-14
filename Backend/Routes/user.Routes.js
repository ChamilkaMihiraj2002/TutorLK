const express = require('express');
const router = express.Router();
const userRoutes = require('../Controllers/userController.js');

router.get('/',userRoutes.getAllUsers); 
router.get('/:name', userRoutes.getUserById);
router.delete('/:id', userRoutes.deleteUser);
router.put('/:id', userRoutes.updateUser); 

module.exports = router;