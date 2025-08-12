// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../Controllers/post.Controller');

// Routes
router.post('/', postController.createPost);         // Create post
router.get('/', postController.getPosts);            // Get all posts
router.get('/:id', postController.getPostById);      // Get post by ID
router.put('/:id', postController.updatePost);       // Update post
router.delete('/:id', postController.deletePost);    // Delete post

module.exports = router;