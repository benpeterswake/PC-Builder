const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gpuSchema = new Schema({
  name: String,
  make: String,
  chipset: String,
  baseclock: Number,
  vram: String,
  tdp: String,
  amazonlink:String
});

const gpu = mongoose.model('gpu', gpuSchema);

module.exports = gpu;
