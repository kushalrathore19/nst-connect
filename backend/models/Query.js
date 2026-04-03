const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  senderName: String,
  senderEmail: String,
  message: String,
  status: {
    type: String,
    enum: ['Pending', 'Resolved'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('Query', querySchema);