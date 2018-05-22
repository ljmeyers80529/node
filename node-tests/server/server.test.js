const request = require('supertest');
const expect = require('expect');

var app = require('./server.js').app;

describe('Server', () => {

    describe('GET \\', () => {
        it('Should return "Hello there!" response', (done) => {
            request(app)
                .get('/')
                .expect(404)
                // .expect('Hello there!')
                .expect((res) => {
                    expect(res.body).toInclude({
                        error: 'Page not found.'
                    });
                })
                .end(done);
        });
    });

    describe('GET \\user', () => {
        it('Should return /user page information...', (done) => {
            request(app)
                .get('/user')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({ name: 'Me', age: 56 }); // /user being an array, must test for all objhect fields.
                })
                .end(done);
        });
    });
});