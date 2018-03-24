const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');

router.get('/new', (req, res) => {
  if(req.session.currentUser){
    if(req.session.currentUser.admin === true){
      res.render('posts/new.ejs', {
        user: req.session.currentUser
      });
    }else{
      res.redirect('/')
    }
  }else{
    res.redirect('/login')
  }
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    console.log(post);
      res.render('posts/show.ejs', {
        user: req.session.currentUser,
        post
      });
  });
});

router.get('/edit/:id', (req, res) => {
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
});

router.post('/new', (req, res) => {
  req.body.username = req.session.currentUser.username;
  Post.create(req.body, (err, post) =>{
    if(err){
      console.log(err);
    }else {
      console.log(post);
      res.redirect('/');
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
})

module.exports = router;
