const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const psuSchema = new Schema({
  name: String,
  make: String,
  series: String,
  form: String,
  efficiency: String,
  watts: Number,
  modular:String,
  price: Number,
  amazonlink:String
});

const psu = mongoose.model('psu', psuSchema);

module.exports = psu;
