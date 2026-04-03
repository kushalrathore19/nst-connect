const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String, required: true },
  techStack: [String],
  calendlyLink: { type: String, required: true },
  whatsappNumber: { type: String },
  isApproved: { type: Boolean, default: false } 
});
module.exports = mongoose.model('Student', studentSchema);