console.log("App.js executing...");

const fs = require('fs');
const os = require("os");
const notes = require("./notes.js");

var user = os.userInfo();

// fs.appendFile("greetings.txt", "Hello " + user.username + "!\n");
// fs.appendFile("greetings.txt", `Hello ${user.username}!\n`);
// fs.appendFile("greetings.txt", `Hello ${user.username}! You are ${notes.age}.\n`);

var res = notes.addNote();
console.log(res);

var a = 3;
var b = 4;
var added = notes.add(a, b);
console.log(`${a} + ${b} = ${added}`)