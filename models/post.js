const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postModel = new Schema({
    username: {type:String, required: true},
    title: String,
    cpu:String,
    gpu:String,
    ram:String,
    cooler:String,
    psu: String,
    storage: String,
    mobo:String,
    case:String,
    price: Number,
    img: String,
});

const Post = mongoose.model('Post', postModel);

module.exports = Post;
