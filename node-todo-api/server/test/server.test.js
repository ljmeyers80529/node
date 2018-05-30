const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb')
const _ = require('lodash');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
        _id: new ObjectID(),
        text: 'Feed the cats'
    },
    {
        _id: new ObjectID(),
        text: 'Pet the kittens',
        completed: true,
        completedAt: 100
    }
];

// beforeEach((done) => {
//     Todo.remove({}).then(() => done());
// });

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
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
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
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