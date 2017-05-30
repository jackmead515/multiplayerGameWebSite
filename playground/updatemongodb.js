const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

function test() {
  return mongoClient.connect('mongodb://127.0.0.1:27017/MultiplayerGame', function(err, db) {
    if (err) {
      console.log(err);
      return;
    }

    db.collection('Users').findOneAndUpdate({
      username: "Jack"
    }, {
      $set: {
        password: "samplepassword1"
      }
    }, {
      returnOriginal: false
    }).then(function(result){
      console.log(result);
    }, function(err) {
      consoloe.log(err);
    });

    //db.close();
  });
}

test();
