const express = require('express');
const app = express();

//Libraries
const mongoose = require('mongoose');
const override = require('method-override');
const bcrypt = require('bcrypt');
const session = require('express-session');

//Controllers
const loginController = require('./controllers/login.js');
const signupController = require('./controllers/signup.js');
const prodcutController = require('./controllers/products.js');
const listController = require('./controllers/list.js');

//Models
const cpu = require('./models/parts/cpu.js');
const gpu = require('./models/parts/gpu.js');
const Cooler = require('./models/parts/cooler.js');
const User = require('./models/user.js');
const List = require('./models/list.js');
const Post = require('./models/post.js');
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
app.use('/products', prodcutController);
app.use('/list', listController);

app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    res.render('index.ejs', {
      user: req.session.currentUser,
      posts
    });
  });
});

app.get('/posts/new', (req, res) => {
  if(req.session.currentUser){
    if(req.session.currentUser.admin === true){
      res.render('posts/new.ejs', {
        user: req.session.currentUser
      });
    }else{
      res.redirect('/')
    }
  }else{
    res.redirect('/login')
  }
});

app.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    console.log(post);
      res.render('posts/show.ejs', {
        user: req.session.currentUser,
        post
      });
  });
});

app.post('/posts/new', (req, res) => {
  req.body.username = req.session.currentUser.username;
  Post.create(req.body, (err, post) =>{
    if(err){
      console.log(err);
    }else {
      console.log(post);
      res.redirect('/');
    }
  });
});

app.get('/success', (req, res) => {
  res.render('success.ejs', {
    user: req.session.currentUser,
  });
});

app.get('/profile', (req, res) => {
  res.render('profile.ejs', {
    user: req.session.currentUser,
  });
});

const seedCPU = require('./models/seed/seedCPU.js');
app.get('/seedCPU', (req, res) => {
      // seeds the data
    cpu.create(seedCPU, (err, created) => {
      console.log(err);
      // logs created users
      console.log(created);
      // redirects to index
      res.redirect('/');
    });
});

const seedGPU = require('./models/seed/seedGPU.js');
app.get('/seedGPU', (req, res) => {
      // seeds the data
    gpu.create(seedGPU, (err, created) => {
      console.log(err);
      // logs created users
      console.log(created);
      // redirects to index
      res.redirect('/');
    });
});

const seedCooler = require('./models/seed/seedCooler.js');
app.get('/seedCooler', (req, res) => {
      // seeds the data
    Cooler.create(seedCooler, (err, created) => {
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
