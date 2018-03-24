const express = require('express');
const router = express.Router();
const cpu = require('../models/parts/cpu.js');
const gpu = require('../models/parts/gpu.js');
const Cooler = require('../models/parts/cooler.js');
const Mobo = require('../models/parts/mobo.js');
const List = require('../models/list.js');
const PriceFinder = require("price-finder");
const priceFinder = new PriceFinder();
let uri;

router.get('/cpu', (req, res) => {
  // const prices = []
  cpu.find({}, (err, data) => {
    // for(let i = 0; i<data.length; i++){
    //  uri = 'https://www.amazon.com/dp/' + data[i].amazonlink;
    //   priceFinder.findItemPrice(uri, function(err, price) {
    //       prices.push(price);
    //    });
    // }
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

router.put('/cpu/:name/:make/:price/:link/:id', (req, res) => {
  if(req.session.currentUser){
    List.findOneAndUpdate(
      {user_id: req.session.currentUser._id},
      { $set: {cpu: { name: req.params.name, make: req.params.make, price: req.params.price, link: req.params.link, id: req.params.id} } },
      (err, data) => {
        console.log(req.params.price);
        res.redirect('/list');
    });
  }else{
    res.redirect('/login');
  }

});

router.put('/gpu/:name/:make/:price/:link/:id', (req, res) => {
    if(req.session.currentUser){
      List.findOneAndUpdate(
        {user_id: req.session.currentUser._id},
        { $set: {gpu: { name: req.params.name, make: req.params.make, price: req.params.price, link: req.params.link, id: req.params.id} } },
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

module.exports = router;
