// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');

// Routes
router.get('/', postController.getPosts);            // Get all posts

module.exports = router;