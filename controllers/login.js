const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router.post('/new', (req, res, error) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
      if(user === null || undefined){
         res.redirect('/login/error');
      }else{
        if(bcrypt.compareSync(req.body.password, user.password)){
          req.session.currentUser = user;
          res.redirect('/list');
        }else {
          res.redirect('/login/error');
        }
      }
  });
});

router.get('/', (req, res) => {
  res.render('login/new.ejs', {
    user: req.session.currentUser
  });
});

router.get('/error', (req, res) => {
  res.render('login/error.ejs', {
    user: req.session.currentUser
  });
});

router.delete('/', (req, res) => {
  req.session.destroy(()=>{
  res.redirect('/')
  });
});

module.exports = router;
