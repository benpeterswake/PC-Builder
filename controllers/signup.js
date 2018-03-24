const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const List = require('../models/list.js');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('signup/new.ejs', {
    user: req.session.currentUser
  });
});

router.get('/error', (req, res) =>{
  res.render('signup/error.ejs', {
    user: req.session.currentUser
  });
});

router.post('/new', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, user) => {
    if(err){
      if(err.code === 11000){
        res.redirect('/signup/error');
      }
    }else{
      List.create({user_id: user._id }, (err, data) =>{
        console.log(data);
      });
      console.log('user created: ' + user);
      res.redirect('/success');
    }
  });
});



module.exports = router;
