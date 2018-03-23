const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postModel = new Schema({
    username: {type:String, required: true},
    title: String,
    content:String,
    price: Number,
    img: String,
});

const Post = mongoose.model('Post', postModel);

module.exports = Post;
