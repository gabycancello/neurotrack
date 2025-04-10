const mongoose = require('mongoose');

const FreelancerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Freelancer', FreelancerSchema);