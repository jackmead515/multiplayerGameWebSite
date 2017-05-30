const fs = require('fs');
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

var findUser = function(email, password, callback) {
  return mongoClient.connect('mongodb://127.0.0.1:27017/MultiplayerGame', function(err, db) {
    if (err) {
      console.log(err);
      db.close();
      callback([]);
    }

    db.collection('users').find({
      email: email,
      password: password
    }).toArray().then(function(docs){
      db.close();
      callback(docs);
    }, function(err) {
      console.log(err);
      db.close();
      callback([]);
    });
  });
};

var validateUser = function(email, password, callback) {
  var users;
  findUser(email, password, function(data) {
    users = data;
    if(users[0] != null && users.length === 1) {
      callback(200);
    } else {
      callback(404);
    }
  });
}

module.exports = {
  validateUser: validateUser
}
