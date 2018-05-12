console.log("Executing notes.js");

//console.log(module);

module.exports.age = 25;

module.exports.addNote = () => {
    console.log('addNote');
    return "New notes.";
}


module.exports.add = (a, b) => {
    return a + b;
}