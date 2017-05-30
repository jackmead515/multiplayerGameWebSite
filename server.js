const express = require('express');
const bdparse = require('body-parser');
const hbs = require('hbs');
const {SHA256} = require('crypto-js');

var {mongoose} = require('./js/mongoose.js');
var {User} = require('./js/mngmodels/user.js');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));
app.use(bdparse.urlencoded({ extended: true }));
app.use(bdparse.json());

app.post('/user', function(req, res) {
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: email
  }).then(function(data) {
    if (!data) {

      var user = new User({
        email: email,
        password: password
      });

      user.save().then(function() {
        return user.generateAuthToken();
      }).then(function(token){
        res.header('x-auth', token).render(__dirname + '/views/account.hbs', {
          title: 'Create Account',
          heading: 'Create a free account',
          formAction: 'user',
          error: 'Account created!'
        });
      }).catch(function(err) {
        return res.status(404).render(__dirname + '/views/account.hbs', {
          title: 'Create Account',
          heading: 'Create a free account',
          formAction: 'user',
          error: 'Failed create account. Please try again with a valid email.'
        });
      });

    } else {
      res.status(404).render(__dirname + '/views/account.hbs', {
        title: 'Create Account',
        heading: 'Create a free account',
        formAction: 'user',
        error: email + ' is already being used!'
      });
    }
  }, function(err) {
    return res.status(404).render(__dirname + '/views/account.hbs', {
      title: 'Create Account',
      heading: 'Create a free account',
      formAction: 'user',
      error: 'Error occured on server side. Please try again later.'
    });
  });
});

app.get('/user', function(req, res) {
  res.render(__dirname + '/views/account.hbs', {
    title: 'Create Account',
    heading: 'Create a free account',
    formAction: 'user'
  });
});

app.post('/login', function(req, res) {
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: email,
    password: password
  }).then(function(data) {
    if (!data) {
      return res.status(404).render(__dirname + '/views/account.hbs', {
        title: 'Login',
        heading: 'Login to your account!',
        formAction: 'login',
        error: 'User account does not exist!'
      });
    } else {
      res.sendFile(__dirname + '/private/home.html');
    }
  }, function(err) {
    res.status(404).render(__dirname + '/views/account.hbs', {
      title: 'Login',
      heading: 'Login to your account!',
      formAction: 'login',
      error: 'Error occured on server side. Please try again later.'
    });
  });
});

app.get('/login', function(req, res) {
  res.render(__dirname + '/views/account.hbs', {
    title: 'Login',
    heading: 'Login to your account!',
    formAction: 'login'
  });
});

app.listen(3000);
