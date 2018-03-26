const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');
const List = require('../models/list.js');

router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    res.render('posts/posts.ejs', {
      user: req.session.currentUser,
      posts
    });
  });
});

router.get('/new', (req, res) => {
  if(req.session.currentUser){
    List.find({user_id: req.session.currentUser._id}, (err, list) => {
      res.render('posts/new.ejs', {
        user: req.session.currentUser,
        list: list[0]
      });
    })
  }else{
    res.redirect('/login')
  }
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      if(err){
        console.log(err);
      }else{
        console.log(post);
        res.render('posts/show.ejs', {
          user: req.session.currentUser,
          post
        });
      }
    });
});

router.get('/edit/:id', (req, res) => {
  if(req.session.currentUser){
    Post.findById(req.params.id, (err, post) => {
        if(err){
          console.log(err);
          res.redirect('/failed');
        }else{
          if(post.username === req.session.currentUser.username){
              res.render('posts/edit.ejs', {
                user: req.session.currentUser,
                post
              });
            }else{
             res.redirect('/failed');
            }
        }
      });
  }else{
    res.redirect('/login')
  }
});


router.post('/new', (req, res) => {
  req.body.username = req.session.currentUser.username;
  Post.create(req.body, (err, post) =>{
    if(err){
      console.log(err);
    }else {
      console.log(post);
      res.redirect('/profile');
    }
  });
});

router.put('/edit/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, post) => {
    if(err){
      console.log(err);
    }else{
      res.redirect('/posts/' + req.params.id)
    }
  });
});

router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id , (err, data) => {
    if(err){
      console.log(err);
    }else{
      console.log(data);
      res.redirect('/profile')
    }
  });
});


module.exports = router;
