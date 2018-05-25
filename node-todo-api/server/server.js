var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// var Todo = mongoose.model('Todo', {
//     text: { type: String, required: true, minLength: 1, trim: true },

//     completed: { type: Boolean, default: false },
//     completedAt: { type: Number, default: null }
// });

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved: ', doc)
// }, (e) => {
//     console.log(e);
// });

// var newTodo = new Todo({});

// newTodo.save().then((doc) => {
//     console.log('Saved: ', doc)
// }, (e) => {
//     console.log(e);
// });

var User = mongoose.model('User', {
    email: { type: String, trim: true, minLength: 1, required: true }
});

var newUser = new User({
    email: 'ljmeyers80529@mail.fresnostate.edu'
});

newUser.save().then((doc) => {
    console.log('Sabed: ', doc);
}, (err) => {
    console.log(err);
});