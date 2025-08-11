const Post = require('../Models/Post.model'); // Adjust path as needed
const mongoose = require('mongoose');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { user, text, image } = req.body;

    // Validate input
    if (!user || !text) {
      return res.status(400).json({ error: 'User and text are required' });
    }

    // Verify user is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const newPost = await Post.create({ user, text, image });
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ error: 'Server error while creating post', details: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: 'user',
      select: 'username email',
      options: { strictPopulate: false }
    });
    const filteredPosts = posts.map(post => ({
      ...post._doc,
      user: post.user || { username: 'Deleted User', email: 'N/A' }
    }));
    res.status(200).json(filteredPosts);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid user ID in one or more posts', details: error.message });
    }
    res.status(500).json({ error: 'Server error while fetching posts', details: error.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    const post = await Post.findById(postId).populate('user', 'username email');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching post', details: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update fields if provided
    if (text) post.text = text;
    if (image) post.image = image;

    const updatedPost = await post.save();
    res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating post', details: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting post', details: error.message });
  }
};