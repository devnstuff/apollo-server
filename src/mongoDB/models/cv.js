const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: 'Untitled'
  },
  summary: {
      type: String,
      trim: true
  },
  personalDetails: {
    jobTitle: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    photo: {
        type: String
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
  },
  employmentHistory: [
    {
        jobTitle: {
            type: String,
        },
        employer: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        current: {
            type: Boolean,
        },
        city: {
            type: String,
        },
        description: {
            type: String,
        },
    }
  ],
  education: [
    {
        school: {
            type: String,
        },
        decgree: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        current: {
            type: Boolean,
        },
        city: {
            type: String,
        },
        description: {
            type: String,
        },
    },
  ],
  skills: [
    {
        skill: {
            type: String,
        },
        level: {
            type: String,
        },
    },
  ],
  courses: [
    {
        course: {
            type: String,
        },
        institution: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        current: {
            type: Boolean,
        },
        description: {
            type: String,
        },
    },
  ],
  internships: [
    {
        jobTitle: {
            type: String,
        },
        employer: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        current: {
            type: Boolean,
        },
        description: {
            type: String,
        },
    },
  ],
  languages: [
    {
        language: {
            type: String,
        },
        level: {
            type: String,
        },
    }
  ],
  hobbies: {
      type: String,
  },
  author: {
    type: String,
    trim: true,
    required: true
  },
  createdAT: {
    type: Date,
    default: Date.now
  },
  updatedAT: {
      type: Date,
      default: Date.now
  },
});

module.exports = CV = mongoose.model('cv', CVSchema);