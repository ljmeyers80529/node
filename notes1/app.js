const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs"); // npm install yargs@4.7.1 --save

const notes = require("./note.js");

const argv = yargs.argv;
var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note === undefined) {
        console.log("No note saved, possible duplicate.");
    } else {
        console.log('Note saved.');
        notes.logNote(note);
    }
} else if (command === "list") {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`)
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === "read") {
    var note = notes.getNote(argv.title);
    if (note === undefined) {
        console.log("Note not found");
    } else {
        console.log('Note found.');
        notes.logNote(note);
    }
} else if (command === "remove") {
    notes.removeNote(argv.title) ? console.log(`Note ${argv.title} was removed.`) : console.log("No note was removed.");
} else {
    console.log("Command not recognized.");
}