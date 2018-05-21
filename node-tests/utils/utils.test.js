const utils = require('./utils.js');

it('Should add two numbers', () => {
    var res = utils.add(33, 11);

    if (res !== 44) {
        throw new Error(`Value incorrect expected 44 but got back ${res}.`);
    };
});

it('Should square a number', () => {
    var res = utils.square(5);

    if (res !== 25) {
        throw new Error(`Value incorrect, expected 25, but got back ${res}.`);
    }
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