const expect = require('expect');

const utils = require('./utils.js');

it('Should add two numbers', () => {
    var res = utils.add(33, 11);

    expect(res).toBe(44).toBeA('number');
    // replaced with 'expect' assertions.
    // if (res !== 44) {
    //     throw new Error(`Value incorrect expected 44 but got back ${res}.`);
    // };
});

it('Should square a number', () => {
    var res = utils.square(5);

    expect(res).toBe(25).toBeA('number');
    // replaced with 'expect' assertions.
    // if (res !== 25) {
    //     throw new Error(`Value incorrect, expected 25, but got back ${res}.`);
    // }
});


it('should equal', () => {
    // expect({ name: 'me' }).toBe({ name: 'me' }); // Does not work for objects.
    // expect({ name: 'me' }).toEqual({ name: 'me' }); // must use this, except 'me' and 'Me' will still pass.
    expect([2, 3, 4]).toInclude(2); // checks if an item is in a list.
    expect([2, 3, 4]).toExclude(1); // checks if an item is NOT in the list.
    expect({
        name: 'me',
        age: 56,
        location: 'Fresno'
    }).toInclude({ age: 56 }); // checks if an item is in an object.
    expect({
        name: 'me',
        age: 56,
        location: 'Fresno'
    }).toExclude({ age: 6 }); // checks if an item is NOT in an object.
});

it('Cheking names...', () => {
    var base = { age: 56 };
    var name = utils.setName(base, "Larry Meyers");
    expect(name).toInclude({
        firstName: "Larry",
        lastName: "Meyers"
    });
});


it('Should Async Add 2 numbers...', (done) => { // add 'done' as argument
    utils.asyncAdd(4, 3, (sum) => {
        expect(sum).toBe(7).toBeA('number');
        done(); // call 'done' so it processes correctly.
    });
});


it('Should square a number...', (done) => { // add 'done' as argument
    utils.asyncSquare(3, (sqr) => {
        expect(sqr).toBe(9).toBeA('number');
        done(); // call 'done' so it processes correctly.
    });
});
// requires modifiection of package.json file as shown.
// execute by using npm test.

// to auto run tests with node monitor enter: nodemon --exec 'npm test'
// also can add a new script field such as:
// "scripts": {
//     "test": "mocha **/*.test.js",
//     "test-watch": "nodemon --exec \"npm test\""
// },
// then execute npm run test-watch