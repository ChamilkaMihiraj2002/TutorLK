const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.Controller'); 

// Define routes
router.post('/', postController.createPost); // Create a post
router.get('/', postController.getAllPosts); // Get all posts
router.get('/:id', postController.getPostById); // Get a post by ID
router.put('/:id', postController.updatePost); // Update a post
router.delete('/:id', postController.deletePost); // Delete a post

module.exports = router;