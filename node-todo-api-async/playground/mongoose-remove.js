const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({ _id: "5b0de21d77ae83dd673406af" }).then((todo) => {})
    .catch((e) => console.log(e));

// Todo.findByIdAndRemove('5b0de08477ae83dd67340638').then((todo) => {
//     console.log(todo);
// }).catch((e) => {});