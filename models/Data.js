
const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true,
    default: 'General'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Archived'],
    default: 'Active'
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// If the model is already defined, use it; otherwise create a new one
module.exports = mongoose.models.Data || mongoose.model('Data', DataSchema);
