const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  image: {
    type: String, // You can store image URL/path here
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);