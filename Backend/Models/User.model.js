const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  subjects: {
    type: [String],
    required: true,
  },
  Grades: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
