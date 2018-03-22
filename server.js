const express = require('express');
const app = express();

//Libraries
const mongoose = require('mongoose');
const override = require('method-override');
const bcrypt = require('bcrypt');
const session = require('express-session');

//Controllers
const loginController = require('./controllers/login.js')
const signupController = require('./controllers/signup.js')

//Models
const cpu = require('./models/cpu.js');
const gpu = require('./models/gpu.js');
const User = require('./models/user.js');

//Port
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pcbuilder';

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(override('_method'));
app.use(session({
  secret: "something", //some random string
  resave: false,
  saveUninitialized: false
}));
app.use('/login', loginController);
app.use('/signup', signupController);


app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.currentUser
  })
});

app.get('/list', (req, res) => {
  if(req.session.currentUser){
    cpu.findById(req.session.currentUser.currentList.cpu, (err, cpu) => {
      gpu.findById(req.session.currentUser.currentList.gpu, (err, gpu) => {
        res.render('list.ejs', {
          user: req.session.currentUser,
          cpu,
          gpu
        });
      })
    });
  }else{
    res.redirect('/login')
  }
});

app.get('/products/cpu', (req, res) => {
  cpu.find({}, (err, data) => {
    res.render('parts/showcpu.ejs', {
      user: req.session.currentUser,
      cpu: data
    });
  });
});

app.get('/products/gpu', (req, res) => {
  gpu.find({}, (err, data) => {
    res.render('./parts/showgpu.ejs', {
      user: req.session.currentUser,
      gpu: data
    });
  });
});

app.put('/products/cpu/:cpu', (req, res) => {
  User.findOneAndUpdate(
    {_id: req.session.currentUser._id},
    { $set: { currentList: {cpu: req.params.cpu } } },
    (err, data) => {
      res.redirect('/list')
    });
});

app.put('/products/gpu/:gpu', (req, res) => {
  User.findOneAndUpdate(
    {_id: req.session.currentUser._id},
    { $set: { currentList: {gpu: req.params.gpu } } },
    (err, data) => {
      res.redirect('/list')
    });
});

const seed = require('./models/seed.js');
app.get('/seed', (req, res) => {
      // seeds the data
    gpu.create(seed, (err, created) => {
      console.log(err);
      // logs created users
      console.log(created);
      // redirects to index
      res.redirect('/');
    });
});

app.listen(port, () => {
  console.log('Up on running on ' + port);
});

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
