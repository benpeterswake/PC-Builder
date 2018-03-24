const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseSchema = new Schema({
  name: String,
  make: String,
  type: String,
  psuIncluded: Boolean, 
  price: Number,
  amazonlink:String
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
