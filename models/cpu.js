const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cpuSchema = new Schema({
  name: String,
  make: String,
  socket: String,
  baseclock: Number,
  cores: Number,
  tdp: String,
  amazonlink:String
});

const cpu = mongoose.model('cpu', cpuSchema);

module.exports = cpu;
