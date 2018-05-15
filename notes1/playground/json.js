// // convert from an object to a JSON object.
// var obj = {
//     name: "Me"
// }

// var stringObj = JSON.stringify(obj);

// console.log(typeof stringObj);
// console.log(stringObj);

// // convert from an JSON object to a object.
// var personString = '{"name": "Me", "age":56}';
// var person = JSON.parse(personString);

// console.log(typeof person);
// console.log(person);

const fs = require("fs");

var originalNote = {
    title: 'Some title',
    body: 'Some body'
};

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);