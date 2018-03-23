const express = require('express');
const router = express.Router();
const cpu = require('../models/parts/cpu.js');
const gpu = require('../models/parts/gpu.js');
const Cooler = require('../models/parts/cooler.js');
const Mobo = require('../models/parts/mobo.js')
const List = require('../models/list.js');

router.get('/', (req, res) => {
  if(req.session.currentUser){
    List.findOne({user_id: req.session.currentUser._id}, (err, userlist) => {
      let parts = [userlist.cpu.price, userlist.gpu.price, userlist.cooler.price];
      let sum = 0;
      for(let i=0; i< parts.length; i++){
        if(parts[i] != undefined){
          sum += parts[i]
        }
      }
      res.render('list.ejs', {
        user: req.session.currentUser,
        cpu: userlist.cpu,
        gpu: userlist.gpu,
        mobo: userlist.mobo,
        cooler: userlist.cooler,
        total: sum
      });
    });
  }else{
    res.redirect('/login')
  }
});

router.put('/cpu', (req, res) => {
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {cpu: {  } } },
        (err, data) => {
          res.redirect('/list')
      });
});

router.put('/gpu', (req, res) => {
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {gpu: { } } },
        (err, data) => {
          res.redirect('/list')
      });
});

router.put('/cpu-cooler', (req, res) => {
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {cooler: { } } },
        (err, data) => {
          res.redirect('/list')
      });
});


module.exports = router;
