// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../Controllers/post.Controller');

// Routes
router.get('/', postController.getPosts);            // Get all posts

module.exports = router;