const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    username: {type:String, unique: true, required: true},
    password: {type:String, required: true},
    first_name: String,
    last_name: String,
});

const User = mongoose.model('User', userModel);

module.exports = User;
