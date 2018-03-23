const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coolerSchema = new Schema({
  name: String,
  make: String,
  speed: String,
  noise: String,
  supported: [String],
  price: Number,
  amazonlink:String
});

const Cooler = mongoose.model('Cooler', coolerSchema);

module.exports = Cooler;
