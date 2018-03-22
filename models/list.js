const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listModel = new Schema({
    user_id: {type:String},
    cpu: {name: String, make: String, link: String, id: String},
    gpu: {name: String, make: String, link: String, id: String},
    cooler: {name: String, make: String, link: String, id: String},
});

const List = mongoose.model('List', listModel);

module.exports = List;
