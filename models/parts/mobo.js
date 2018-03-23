const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moboSchema = new Schema({
  name: String,
  make: String,
  socket: String,
  form: String,
  ram: Number,
  maxRam: Number,
  amazonlink:String
});

const Mobo = mongoose.model('Mobo', moboSchema);

module.exports = Mobo;
