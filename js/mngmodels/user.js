const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
      unique: true,
      validate: {
        isAsync: false,
        validator: validator.isEmail
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 10
    },
    username: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30
    },
    tokens: [{
      access: {
          type: String,
          required: true
      },
      token: {
          type: String,
          required: true
      }
    }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
     access
  },'wingwing').toString();

  user.tokens.push({access, token});

  return user.save().then(function(user) {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
      decoded = jwt.verify(token, 'wingwing');
  } catch (err) {
      return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;

    return User.findOne({email: email}).then(function(user){
      if(!user) {
        return Promise.reject();
      }

      return new Promise(function(resolve, reject){
        bcrypt.compare(password, user.password, function(err, res) {
          if(res){
            resolve(user);
          }
          reject();
        });
      });
    });
};

UserSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')){
      var password = user.password;
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash){
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
});

var User = mongoose.model('Users', UserSchema);

module.exports = {
  User: User
}
