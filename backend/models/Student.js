const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  cfHandle: { type: String, required: true },
  currentRating: Number,
  maxRating: Number,
  lastSyncedAt: Date,
  emailRemindersSent: { type: Number, default: 0 },
  emailReminderDisabled: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
