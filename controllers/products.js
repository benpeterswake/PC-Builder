const express = require('express');
const router = express.Router();
const cpu = require('../models/cpu.js');
const gpu = require('../models/gpu.js');
const Cooler = require('../models/cooler.js');
const Mobo = require('../models/parts/mobo.js');
const List = require('../models/list.js');

router.get('/cpu', (req, res) => {
  cpu.find({}, (err, data) => {
    res.render('parts/showcpu.ejs', {
      user: req.session.currentUser,
      cpu: data
    });
  });
});

router.get('/cpu-cooler', (req, res) => {
  Cooler.find({}, (err, data) => {
    res.render('./parts/showcooler.ejs', {
      user: req.session.currentUser,
      cooler: data
    });
  });
});

router.get('/motherboard', (req, res) => {
  Mobo.find({}, (err, data) => {
    res.render('./parts/showmobo.ejs', {
      user: req.session.currentUser,
      mobo: data
    });
  });
});

router.get('/gpu', (req, res) => {
  gpu.find({}, (err, data) => {
    res.render('./parts/showgpu.ejs', {
      user: req.session.currentUser,
      gpu: data
    });
  });
});

router.put('/cpu/:name/:make/:link/:id', (req, res) => {
  if(req.session.currentUser){
    List.findOneAndUpdate(
      {user_id: req.session.currentUser._id},
      { $set: {cpu: { name: req.params.name, make: req.params.make, link: req.params.link, id: req.params.id} } },
      (err, data) => {
        res.redirect('/list');
    });
  }else{
    res.redirect('/login');
  }

});

router.put('/gpu/:name/:make/:link/:id', (req, res) => {
    if(req.session.currentUser){
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {gpu: { name: req.params.name, make: req.params.make, link: req.params.link, id: req.params.id} } },
        (err, data) => {
          res.redirect('/list')
      });
    }else{
      res.redirect('/login');
    }
});

router.put('/cpu-cooler/:name/:make/:link/:id', (req, res) => {
    if(req.session.currentUser){
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {cooler: { name: req.params.name, make: req.params.make, link: req.params.link, id: req.params.id} } },
        (err, data) => {
          res.redirect('/list')
      });
    }else{
      res.redirect('/login');
    }
});

module.exports = router;
