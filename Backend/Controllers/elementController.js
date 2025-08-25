const Classes = require('../Models/Class.model');
const posts = require('../Models/Post.model');

exports.getDetails = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};