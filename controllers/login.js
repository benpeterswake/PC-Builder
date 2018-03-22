const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router.post('/new', (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if(bcrypt.compareSync(req.body.password, user.password)){
      req.session.currentUser = user;
      res.redirect('/');
    }else {
      res.send('Wrong password. Try again')
    }
  })
});

router.get('/', (req, res) => {
  res.render('login/new.ejs', {
    user: req.session.currentUser
  });
});

router.delete('/', (req, res) => {
  req.session.destroy(()=>{
  res.redirect('/')
  });
});

module.exports = router;
