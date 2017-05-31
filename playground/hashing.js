const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "samplepassword";

bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash(password, salt, function(err, hash){
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$Wip/5h8agyHMELj5oUIiqeiNnVQSi8OfNaL46GngC5YYAq4h4qEkW';

bcrypt.compare(password, hashedPassword, function(err, res) {
  console.log(res);
});

/*var data = {
  id: 10
}

var token = jwt.sign(data, '123abc');

var decoded = jwt.verify(token, '123abc');*/

/*var message = 'I am a thing!';
var hash = SHA256(message).toString();

console.log(message + '\n' + hash);

var data = {
  id: 4
};
var token = {
  data: data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};
//token has been salted. Can't manipulate!

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('data was changed.');
}*/
