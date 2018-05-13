console.log("App.js executing...");

const fs = require('fs'); // require format used with node libraries
const os = require("os");
const notes = require("./notes.js"); // required when using your own custom external files.
const _ = require("lodash"); // 3rd party libraries format.

// this will require to run : npm init  
//                            npm install lodash --save

var user = os.userInfo();

// fs.appendFile("greetings.txt", "Hello " + user.username + "!\n");                        // code for using required with node libraries.
// fs.appendFile("greetings.txt", `Hello ${user.username}!\n`);
// fs.appendFile("greetings.txt", `Hello ${user.username}! You are ${notes.age}.\n`);

var res = notes.addNote();
console.log(res);

var a = 3;
var b = 4;
var added = notes.add(a, b);
console.log(`${a} + ${b} = ${added}`)


// using lodash

console.log(_.isString(true));
console.log(_.isString('A'));
console.log(_.isString('Test'));

var filteredArray = _.uniq(["me", 1, "me", 1, 2, 3, 4, 1, "me"]);
console.log(filteredArray);