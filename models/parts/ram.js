const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ramSchema = new Schema({
  name: String,
  make: String,
  speed: String,
  type: String,
  cas: Number,
  modules: String,
  size: Number,
  price:Number,
  amazonlink:String
});

const ram = mongoose.model('ram', ramSchema);

module.exports = ram;
