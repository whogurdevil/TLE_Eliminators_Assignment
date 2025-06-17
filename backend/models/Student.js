const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({}, { strict: false });
const ContestSchema = new mongoose.Schema({}, { strict: false });

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  cfHandle: String,
  currentRating: Number,
  maxRating: Number,
  contestHistory: [ContestSchema],  
  submissions: [SubmissionSchema],  
  lastSyncedAt: Date,
  reminderEmailCount: {
    type: Number,
    default: 0
  },
  reminderEmailDisabled: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Student', studentSchema);
