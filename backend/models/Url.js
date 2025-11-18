const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  analytics: [{
    date: {
      type: Date,
      default: Date.now,
    },
    referrer: String,
    ipAddress: String,
  }],
});

module.exports = mongoose.model('Url', urlSchema);