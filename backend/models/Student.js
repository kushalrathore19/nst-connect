const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  year: Number,
  techStack: [String],
  calendlyLink: String,
  isActive: Boolean
});

module.exports = mongoose.model('Student', studentSchema);