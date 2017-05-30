const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

function test() {
  return mongoClient.connect('mongodb://127.0.0.1:27017/MultiplayerGame', function(err, db) {
    if (err) {
      console.log(err);
      return;
    }

    // deleteMany
    /*db.collection('Users').deleteMany({
      username: "Jack"
    }).then(function(result){
      console.log(result);
    }, function(err){
      console.log(err);
    });*/

    //deleteOne
    /*db.collection('Users').deleteOne({
      username: "Jack"
    }).then(function(result){
      console.log(result);
    }, function(err){
      console.log(err);
    });*/

    //findOneAndDelete
    db.collection('Users').findOneAndDelete({
      username: "Maria"
    }).then(function(result){
      console.log(result);
    }, function(err){
      console.log(err);
    });

    //db.close();
  });
}

test();
