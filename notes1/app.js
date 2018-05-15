console.log("Starting app.js ...");

const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs"); // npm install yargs@4.7.1 --save

const notes = require("./note.js");

const argv = yargs.argv;
var command = argv._[0];
console.log(`Command: ${command}`);
console.log("Yargs ", argv)

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note === undefined) {
        console.log("No note saved, possible duplicate.");
    } else { console.log(`Title: ${note.title},  Body: ${note.body}`) }
} else if (command === "list") {
    notes.getAll();
} else if (command === "read") {
    notes.getNote(argv.title);
} else if (command === "remove") {
    notes.removeNote(argv.title);
} else {
    console.log("Command not recognized.");
}