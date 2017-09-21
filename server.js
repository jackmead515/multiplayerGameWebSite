const express = require('express');
const bdparse = require('body-parser');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');

var {mongoose} = require('./js/mongoose.js');
var {User} = require('./js/mngmodels/user.js');

const URL = '192.168.1.25:3000';
const PORT = 3000;

var app = express();

//#################################################################
//#####################   MIDDLEWARE BELOW   ######################
//#################################################################

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));
app.use(favicon(__dirname + '/views/img/favicon.ico'));
app.use(bdparse.urlencoded({ extended: true }));
app.use(bdparse.json());
app.use(cookieParser());

var authenticate = function(req, res, next) {
  var token = req.cookies.token;

  User.findByToken(token).then(function(user) {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;

    next();
  }).catch(function(err) {
    res.redirect('http://' + URL + '/login');
  });
};

//#################################################################
//#####################   APP START BELOW    ######################
//#################################################################

app.post('/create', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var username = req.body.username;

  User.findOne({
    email: email
  }).then(function(data) {
    if (!data) {

      var user = new User({
        email: email,
        password: password,
        username: username
      });

      user.save().then(function() {
        return user.generateAuthToken();
      }).then(function(token) {
          res.cookie('token', token, {maxAge: 36000000}).send({ status: 200 });
      }).catch(function(err) {
        res.send({
          message: 'Failed to create account. Please try again with a valid email.',
          status: 400
        });
      });

    } else {
      res.send({
        message: email + ' is already being used!',
        status: 400
      });
    }
  }, function(err) {
    res.send({
      message: 'Error occured. Please try again with valid credentials.',
      status: 400
    });
  });
});

app.get('/create', function(req, res) {
  res.render(__dirname + '/views/createaccount.hbs', {
    title: 'Create Account',
    heading: 'Create a free account',
    method: 'createAccount()',
    URL: URL
  });
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  User.findByCredentials(email, password).then(function(user){
    //happy path
    user.tokens = [];
    return user.save().then(function(){
      return user.generateAuthToken().then(function(token) {
        res.cookie('token', token, {maxAge: 36000000}).send({ status: 200 });
      });
    }).catch(function(err){
      res.send({
        message: 'Failed to login to account. Please try again.',
        status: 400
      });
    });
  }).catch(function(err){
    res.send({
      message: 'User account does not exist!',
      status: 400
    });
  });
});

app.get('/login', function(req, res) {
  res.render(__dirname + '/views/login.hbs',
    URL: URL
  );
});

app.post('/gamelogin', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  User.findByCredentials(email, password).then(function(user){
    setTimeout(function(){
      res.status(200).send(user.username); 
    }, 2000);
  }).catch(function(err){
    setTimeout(function(){
      res.status(400).send();
    }, 2000);
  });
});

app.get('/home', authenticate, function(req, res) {
  var user = req.user;

  res.render(__dirname + '/private/home.hbs', {
    username: user.username,
    URL: URL
  });
});

app.get('/downloadGame', authenticate, function(req, res){

  res.sendFile(__dirname + '/private/MultiGame.jar');

});

app.listen(PORT);
