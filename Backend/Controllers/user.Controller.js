
const mongoose = require('mongoose');
const { get } = require('mongoose');
const User = require('../Models/User.model');
const Post = require('../Models/Post.model');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // returns all users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userName = req.params.name;
    const user = await User.findOne({ username : userName });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete user first
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Try deleting posts with both ObjectId and string match
    const result = await Post.deleteMany({
      $or: [
        { user: userId }, // in case it's stored as a string
        { user: new mongoose.Types.ObjectId(userId) } // in case it's stored as ObjectId
      ]
    });

    res.status(200).json({
      message: `User deleted successfully, ${result.deletedCount} post(s) removed`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user and posts' });
  }
};


const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body; 
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
