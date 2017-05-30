var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/MultiplayerGame');

 var newUser = new multiGame({
   username: 'jackmead515',
   password: 'samplepassword'
 });

 var nUser = new multiGame({
    username: 'mariaisawesome',
    password: 'samplepassword1'
})

nUser.save().then(function(doc){
  console.log(doc);
}, function(err) {
  consoloe.log(err);
});

 newUser.save().then(function(doc){
   console.log(doc);
 }, function(err) {
   consoloe.log(err);
 });
