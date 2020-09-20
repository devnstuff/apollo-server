const mongoose = require('mongoose');

const CoverSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  employerDetails: {
    company: {
        type: String,
    },
    manager: {
        type: String,
    },
  },
  letterDetails: {
      type: String,
  },
  personalDetails: {
    fullName: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
  },
});

module.exports = Cover = mongoose.model('cover', CoverSchema);