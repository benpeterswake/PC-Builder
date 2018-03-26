const express = require('express');
const router = express.Router();
const cpu = require('../models/parts/cpu.js');
const gpu = require('../models/parts/gpu.js');
const Cooler = require('../models/parts/cooler.js');
const Mobo = require('../models/parts/mobo.js');
const ram = require('../models/parts/ram.js');
const storage = require('../models/parts/storage.js');
const psu = require('../models/parts/psu.js');
const Case = require('../models/parts/case.js');
const monitor = require('../models/parts/monitor.js');
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

router.get('/ram', (req, res) => {
  ram.find({}, (err, data) => {
    res.render('./parts/showram.ejs', {
      user: req.session.currentUser,
      ram: data
    });
  });
});

router.get('/storage', (req, res) => {
  storage.find({}, (err, data) => {
    res.render('./parts/showstorage.ejs', {
      user: req.session.currentUser,
      storage: data
    });
  });
});

router.get('/psu', (req, res) => {
  psu.find({}, (err, data) => {
    res.render('./parts/showpsu.ejs', {
      user: req.session.currentUser,
      psu: data
    });
  });
});

router.get('/case', (req, res) => {
  Case.find({}, (err, data) => {
    res.render('./parts/showcase.ejs', {
      user: req.session.currentUser,
      Case: data
    });
  });
});

router.get('/monitor', (req, res) => {
  monitor.find({}, (err, data) => {
    res.render('./parts/showmonitor.ejs', {
      user: req.session.currentUser,
      monitor: data
    });
  });
});

router.put('/cpu/:name/:make/:price/:link/:id', (req, res) => {
  if(req.session.currentUser){
    List.findOneAndUpdate(
      {user_id: req.session.currentUser._id},
      { $set: {cpu: { name: req.params.name, make: req.params.make, price: req.params.price, link: req.params.link, id: req.params.id} } },
      (err, data) => {
        res.redirect('/list');
    });
  }else{
    res.redirect('/login');
  }

});

router.put('/gpu/:name/:make/:price/:link/:size/:id', (req, res) => {
    if(req.session.currentUser){
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {gpu: { name: req.params.name, make: req.params.make, price: req.params.price, link: req.params.link, size: req.params.size, id: req.params.id} } },
        (err, data) => {
          res.redirect('/list')
      });
    }else{
      res.redirect('/login');
    }
});

router.put('/cpu-cooler/:name/:make/:price/:link/:id', (req, res) => {
    if(req.session.currentUser){
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {cooler: { name: req.params.name, make: req.params.make, price:req.params.price, link: req.params.link, id: req.params.id} } },
        (err, data) => {
        res.redirect('/list')
      });
    }else{
        res.redirect('/login');
    }
});

router.put('/mobo/:name/:make/:price/:link/:id', (req, res) => {
    if(req.session.currentUser){
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {mobo: { name: req.params.name, make: req.params.make, price:req.params.price, link: req.params.link, id: req.params.id} } },
        (err, data) => {
        res.redirect('/list')
      });
    }else{
        res.redirect('/login');
    }
});

router.put('/ram/:name/:make/:price/:link/:size/:id', (req, res) => {
    if(req.session.currentUser){
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {ram: { name: req.params.name, make: req.params.make, price:req.params.price, link: req.params.link, size:req.params.size, id: req.params.id} } },
        (err, data) => {
        res.redirect('/list')
      });
    }else{
        res.redirect('/login');
    }
});

router.put('/storage/:name/:make/:price/:link/:size/:id', (req, res) => {
    if(req.session.currentUser){
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {storage: { name: req.params.name, make: req.params.make, price:req.params.price, link: req.params.link, size:req.params.size, id: req.params.id} } },
        (err, data) => {
        res.redirect('/list')
      });
    }else{
        res.redirect('/login');
    }
});


router.put('/psu/:name/:make/:price/:link/:watts/:id', (req, res) => {
    if(req.session.currentUser){
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {psu: { name: req.params.name, make: req.params.make, price:req.params.price, link: req.params.link, watts: req.params.watts, id: req.params.id} } },
        (err, data) => {
        res.redirect('/list')
      });
    }else{
        res.redirect('/login');
    }
});

router.put('/case/:name/:make/:price/:link/:id', (req, res) => {
    if(req.session.currentUser){
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {case: { name: req.params.name, make: req.params.make, price:req.params.price, link: req.params.link, id: req.params.id} } },
        (err, data) => {
        res.redirect('/list')
      });
    }else{
        res.redirect('/login');
    }
});

router.put('/monitor/:name/:make/:price/:link/:size/:id', (req, res) => {
    if(req.session.currentUser){
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {monitor: { name: req.params.name, make: req.params.make, price:req.params.price, link: req.params.link, size:req.params.size, id: req.params.id} } },
        (err, data) => {
        res.redirect('/list')
      });
    }else{
        res.redirect('/login');
    }
});

module.exports = router;
