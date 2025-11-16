const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  messId: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comments: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema)