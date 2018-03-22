const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('signup/new.ejs', {
    user: req.session.currentUser
  });
});

router.post('/new', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, user) => {
    if(err){
      console.log(err);
      res.redirect('/signup');
    }else{
      console.log('user created: ' + user);
      res.redirect('/login');
    }
  });
});

module.exports = router;
