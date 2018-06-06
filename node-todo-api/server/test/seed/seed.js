const { ObjectID } = require('mongodb');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userID1 = new ObjectID();
const userID2 = new ObjectID();

const users = [{
    _id: userID1,
    email: 'me1@example.com',
    password: 'password1',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userID1, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userID2,
    email: 'me2@example.com',
    password: 'password2',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userID2, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}];

const todos = [{
        _id: new ObjectID(),
        text: 'Feed the cats',
        _creator: userID1
    },
    {
        _id: new ObjectID(),
        text: 'Pet the kittens',
        completed: true,
        completedAt: 100,
        _creator: userID2
    }
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var user1 = new User(users[0]).save();
        var user2 = new User(users[1]).save();

        return Promise.all([user1, user2])
    }).then(() => done());
};

module.exports = { populateTodos, todos, populateUsers, users };