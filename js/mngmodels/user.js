const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 5,
      trim: true,
      unique: true,
      validate: {
        validator: validator.isEmail
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 10
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

var User = mongoose.model('Users', UserSchema);

module.exports = {
  User: User
}
