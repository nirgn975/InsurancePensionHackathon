const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OpenPensionSchema = new Schema({
  instrument_id: {
    type: String,
  },
  instrument_type: {
    type: String,
  },
  instrument_sub_type: {
    type: String,
  },
  instrument_name: {
    type: String,
  },
  managing_body: {
    type: String,
  },
  fund: {
    type: Number,
  },
  fund_name: {
    type: String,
  },
  fair_value: {
    type: Number,
  },
  par_value: {
    type: Number,
  },
});

module.exports = mongoose.model('openPension', OpenPensionSchema);
