const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storageSchema = new Schema({
  name: String,
  make: String,
  series: String,
  form: String,
  type: String,
  size: Number,
  price:Number,
  amazonlink:String
});

const storage = mongoose.model('storage', storageSchema);

module.exports = storage;
