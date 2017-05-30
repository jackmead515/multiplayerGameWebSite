const mongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').ObjectID;

function test() {
  return mongoClient.connect('mongodb://127.0.0.1:27017/MultiplayerGame', function(err, db) {
    if (err) {
      //TODO
      console.log(err);
      return;
    }

    db.collection('Users').insertOne({
      username: 'Jack',
      password: 'samplepassword'
    }, function(err, result) {
      if (err) {
        //TODO
        console.log(err);
        return;
      }
      console.log(JSON.stringify(result.ops));
    });

    db.close();
  });
}

test();
