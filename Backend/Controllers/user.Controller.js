
const { get } = require('mongoose');
const User = require('../Models/User.model');

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
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
};
