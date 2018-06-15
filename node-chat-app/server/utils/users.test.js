const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Me1',
            room: 'C#'
        }, {
            id: 2,
            name: 'Me2',
            room: 'Node'
        }, {
            id: 3,
            name: 'Me3',
            room: 'C#'
        }]
    });


    it('should add new user', () => {
        var users = new Users();
        var user = { id: 100, name: 'Me', room: 'Developer' };

        var res = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    })

    it('should remove an user', () => {
        var id = 1;
        var user = users.removeUser(id);

        expect(user.id).toBe(id);
        expect(users.users.length).toBe(2);
    });

    it('should not remove an user', () => {
        var id = 100;
        var user = users.removeUser(id);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);

    });

    it('should find an user', () => {
        var user = users.getUser(2);

        expect(user).toMatchObject({
            id: 2,
            name: 'Me2',
            room: 'Node'
        });
    });

    it('should not find an user', () => {
        var user = users.getUser(200);

        expect(user).toBeFalsy();
    });

    it('should return names for C# room', () => {
        var userList = users.getUserList('C#');

        expect(userList).toEqual(['Me1', 'Me3']);
    });

    it('should return names for Node room', () => {
        var userList = users.getUserList('Node');

        expect(userList).toEqual(['Me2']);
    });
});