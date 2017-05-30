const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

function test() {
  return mongoClient.connect('mongodb://127.0.0.1:27017/MultiplayerGame', function(err, db) {
    if (err) {
      console.log(err);
      return;
    }

    db.collection('Users').find({
      username: "Jack"
    }).toArray().then(function(docs){
      console.log(JSON.stringify(docs, undefined, 2));
    }, function(err) {
      consoloe.log(err);
    });

    db.collection('Users').find({
      username: "Maria"
    }).count().then(function(count){
      console.log('Count: ' + count);
    }, function(err) {
      consoloe.log(err);
    });

    //db.close();
  });
}

test();
