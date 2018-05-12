console.log("App executing...");

const fs = require('fs');
const os = require("os");

var user = os.userInfo();

fs.appendFile("greetings.txt", "Hello " + user.username + "!\n");
fs.appendFile("greetings.txt", `Hello ${user.username}!\n`);