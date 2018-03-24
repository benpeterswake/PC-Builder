const express = require('express');
const router = express.Router();
const cpu = require('../models/parts/cpu.js');
const gpu = require('../models/parts/gpu.js');
const Cooler = require('../models/parts/cooler.js');
const Mobo = require('../models/parts/mobo.js');
const ram = require('../models/parts/ram.js');
const List = require('../models/list.js');

router.get('/', (req, res) => {
  if(req.session.currentUser){
    List.findOne({user_id: req.session.currentUser._id}, (err, userlist) => {
      let parts = [userlist.cpu.price, userlist.gpu.price, userlist.cooler.price, userlist.mobo.price, userlist.ram.price];
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
        ram: userlist.ram,
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

router.put('/mobo', (req, res) => {
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {mobo: { } } },
        (err, data) => {
          res.redirect('/list')
      });
});

router.put('/ram', (req, res) => {
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {ram: { } } },
        (err, data) => {
          res.redirect('/list')
      });
});

module.exports = router;
