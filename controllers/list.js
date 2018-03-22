const express = require('express');
const router = express.Router();
const cpu = require('../models/cpu.js');
const gpu = require('../models/gpu.js');
const Cooler = require('../models/cooler.js');
const List = require('../models/list.js');

router.get('/', (req, res) => {
  if(req.session.currentUser){
    List.findOne({user_id: req.session.currentUser._id}, (err, userlist) => {
      res.render('list.ejs', {
        user: req.session.currentUser,
        cpu: userlist.cpu,
        gpu: userlist.gpu,
        cooler: userlist.cooler
      });
    });
  }else{
    res.redirect('/login')
  }
});

router.put('/cpu', (req, res) => {
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {cpu: { name: 'none'} } },
        (err, data) => {
          res.redirect('/list')
      });
});

router.put('/gpu', (req, res) => {
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {gpu: { name: 'none'} } },
        (err, data) => {
          res.redirect('/list')
      });
});

module.exports = router;
