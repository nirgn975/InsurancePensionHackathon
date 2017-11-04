const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GraphSchema = new Schema({
  id: {
    type: String,
    trim: true,
    required: true,
  },
  kind: {
    type: String,
    enum: ['stock', 'bond'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avg: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('graph', GraphSchema);
