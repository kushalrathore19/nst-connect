const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  year: Number,
  techStack: [String],
  calendlyLink: String,
  isActive: Boolean,
  whatsappNumber: { type: String } //added whatsappNumber field to store the student's WhatsApp number
});

module.exports = mongoose.model('Student', studentSchema);