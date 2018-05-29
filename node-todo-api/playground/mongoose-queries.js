const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// const id = "5b0a41b3d8a0f32418f233e7";
// const id = "6b0a41b3d8a0f32418f233e7"; // invalid     
const id = "5b0793fb25f2042fac11754b";

if (!ObjectID.isValid(id)) {
    console.log('ID not valid.');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Invalid id.');
//     }
//     console.log('Todo', todo);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
    if (!user) {
        return console.log('Invalid id.');
    }
    console.log('User', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));