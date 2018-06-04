const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "123abc!";

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash)
    });
});

var hashedPassword = '$2a$10$.ZTIQ/fwnjfdsqiru9BSfu7LjyLrKllPRT7VIqe7mUoDCaKLcwfmy';

bcrypted.compare(password, hashedPassword, (err, result) => {
    console.log(result);
});

// var message = 'I am using node.js';

// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abcc');
// console.log('Decoded: ', decoded);


// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + "4958y7fdRER@f").toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + "4958y7fdRER@f").toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed.');
// } else {
//     console.log("Data was changed. Don't trust");
// }