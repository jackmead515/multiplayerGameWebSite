const express = require('express');
const bdparse = require('body-parser');

var {mongoose} = require('./js/validate.js');
var {User} = require('./js/mngmodels/user.js');
var {ObjectID} = require('mongodb');

var app = express();

app.use(bdparse.urlencoded({ extended: true }));
app.use(bdparse.json());

app.post('/users', function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save().then(function(doc) {
    res.status(200).send(doc);
  }, function(err) {
    res.status(400).send(err);
  });
});

app.get('/users', function(req, res) {
  User.find().then(function(data) {
    res.status(200).send({data});
  }, function(err) {
    res.status(400).send(err);
  });
});

app.get('/users/:id', function(req, res) {
  var id = req.params.id;

  if(ObjectID.isValid(id)){
    User.findById(id).then(function(user) {
      if(user){
          res.send(user); // happy path
      } else {
          res.status(404).send();
      }
    }, function(err) {
      res.status(400).send();
    });
  } else {
    res.status(400).send();
  }
});


app.listen(3000, function() {
  console.log("Server started...");
});
