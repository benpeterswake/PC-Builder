const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monitorSchema = new Schema({
  name: String,
  make: String,
  resolution: String,
  size: String,
  price: Number,
  amazonlink:String
});

const monitor = mongoose.model('monitor', monitorSchema);

module.exports = monitor;
