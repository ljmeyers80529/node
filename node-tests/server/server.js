const express = require('express');

var app = express();

app.get('/', (req, res) => {
    // res.send('Hello there!');
    res.status(404)
        .send({
            error: 'Page not found.',
            name: 'todo App 1.0'
        });
});

app.get('/user', (req, res) => {
    res.send(
        [{
                name: 'Me',
                age: 56
            },
            {
                name: 'Larry',
                age: 26
            },
            {
                name: 'Joshua',
                age: 13
            }
        ]
    );
});

app.listen(3000);

module.exports.app = app;