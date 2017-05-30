const {mongoose} = require('./../js/mongoose.js');
const {User} = require('./../js/mngmodels/user.js');
const {ObjectID} = require('mongodb');

var username = 'jackmead515';
var id = '5926e717ea60442a38b029b1';
var wrongID = '6926e717ea60442a38b029b1 5';

/*if(ObjectID.isValid(wrongID)){
  User.findById(wrongID).then(function(user){
    if(!user){
      return console.log('ID not found');
    }
    console.log(user);
  }).catch(function(err){
    console.log(err);
  });
} else {
  console.log('wrongID is not valid');
}

User.find({
  username: username
}).then(function(users){
  console.log(users);
});*/

User.findOne({
  password: 'samplepaadsfssword'
}).then(function(user){
  console.log(user);
});

/*User.findById(id).then(function(user){
  console.log(user);
});*/
