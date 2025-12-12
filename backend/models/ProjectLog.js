const mongoose = require('mongoose');

const projectLogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Want to Watch' },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ProjectLog', projectLogSchema);