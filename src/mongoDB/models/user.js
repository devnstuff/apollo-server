const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Active',
  },
  count: {
    type: Number,
    default: 0,
  },
  permissions: {
    type: String,
    default: 'readOnly',
  },
});

module.exports = User = mongoose.model('user', UserSchema);
