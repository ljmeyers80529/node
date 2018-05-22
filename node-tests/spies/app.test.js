const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {
    var db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);

    it('Should call the spy correctly...', () => {
        var spy = expect.createSpy();
        spy('Me', 56);
        expect(spy).toHaveBeenCalledWith('Me', 56);
    });

    it('should call saveUser with user object...', () => {
        var email = 'xxxx@xxx.com';
        var password = '123';

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({ email, password });
    });
});