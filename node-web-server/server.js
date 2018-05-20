const express = require('express');

var app = express();

console.log(__dirname + '\\public');
app.use(express.static(__dirname + '\\public'));

app.get('/', (req, res) => { // req = request, res = response
    // res.send('<h1>Hello express!</h1>');
    res.send({
        name: 'Me',
        other: [
            'Other1',
            'Other2'
        ]
    });
});

app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error!'
    });
});

app.listen(3000);