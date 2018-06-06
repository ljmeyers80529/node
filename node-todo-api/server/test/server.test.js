const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

// const todos = [{
//         _id: new ObjectID(),
//         text: 'Feed the cats'
//     },
//     {
//         _id: new ObjectID(),
//         text: 'Pet the kittens',
//         completed: true,
//         completedAt: 100
//     }
// ];

// beforeEach((done) => {
//     Todo.remove({}).then(() => done());
// });

// beforeEach((done) => {
//     Todo.remove({}).then(() => {
//         return Todo.insertMany(todos);
//     }).then(() => done());
// });

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token) // added when authentication is implemented.
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token) // added when authentication is implemented.
            .send({})
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos.', (done) => {
        request(app)
            .get(`/todos`)
            .set('x-auth', users[0].tokens[0].token) // added when authentication is implemented.
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc.', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text); // this makes a custom expect test.
            })
            .end(done);
    });

    it('should return 404 if todo not found.', (done) => {
        var hexID = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${hexID}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 for non-object ids.', (done) => {
        request(app)
            .get(`/todos/123abc`)
            .expect(404)
            .end(done)
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hId).then((todo) => {
                    expect(todo).toNotExist;
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if todo not found.', (done) => {
        var hexID = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 for non-object ids.', (done) => {
        request(app)
            .delete(`/todos/123abc`)
            .expect(404)
            .end(done)
    });

});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hId = todos[0]._id.toHexString();
        var update = {
            text: "Done feeding kittens.",
            completed: true
        };

        request(app)
            .patch(`/todos/${hId}`)
            .send(update)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(update.text);
                expect(res.body.todo.completed).toBe(update.completed);
                expect(typeof(res.body.todo.completedAt)).toBe('number');
            })
            .end(done);
    });

    it('should clear the completedAt when todo is not completed', (done) => {
        var hId = todos[1]._id.toHexString();
        var update = {
            text: "Done petting the kittens.",
            completed: false
        };

        request(app)
            .patch(`/todos/${hId}`)
            .send(update)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(update.text);
                expect(res.body.todo.completed).toBe(update.completed);
                expect(res.body.todo.completedAt).toBeNull();
            })
            .end(done);
    });
});

describe('GET /users/me', () => {

    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({})
            })
            .end(done);
    });

});

describe('POST /users', () => {

    it('should create a user', (done) => {
        var email = 'me3@example.com';
        var password = 'password3';

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                User.findOne({ email }).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should return validation errors if request is invalid', (done) => {
        var email = 'me4';
        var password = 'pas';

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(400)
            .end(done);
    });

    it('should not create user if email is in use', (done) => {
        var email = 'me3@example.com';
        var password = 'password3';

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .end(done);
    });

});

describe('POST /users/login', () => {

    it('should login user and return vaild auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy()
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[0]).toMatchObject({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should reject invaild login', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password + 'x'
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeFalsy()
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });
    });

});


describe('DELETE /users/me/token', () => {

    it('should remove auth token on logout', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.findById(users[0]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });
    });

});