const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({}, { strict: false });
const ContestSchema = new mongoose.Schema({}, { strict: false });

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  cfHandle: {
    type: String,
    required: true,
    trim: true,
  },
  currentRating: Number,
  maxRating: Number,
  lastSyncedAt: Date,
  reminderEmailCount: {
    type: Number,
    default: 0
  },
  reminderEmailDisabled: {
    type: Boolean,
    default: false
  },
  contestHistory: [ContestSchema],  
  submissions: [SubmissionSchema]
});

module.exports = mongoose.model('Student', studentSchema);
