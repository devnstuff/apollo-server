const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  content: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = Post = mongoose.model('post', PostSchema);