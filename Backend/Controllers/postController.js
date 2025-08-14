// controllers/postController.js
const Post = require('../Models/Post.model');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { user, text, image } = req.body;

    if (!user || !text) {
      return res.status(400).json({ message: 'User and text are required' });
    }

    const post = new Post({
      user,
      text,
      image
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // latest first
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
