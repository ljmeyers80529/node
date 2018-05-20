const express = require('express');
const hvs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
console.log(__dirname + '\\public');
app.use(express.static(__dirname + '\\public'));

app.get('/', (req, res) => { // req = request, res = response
    // res.send('<h1>Hello express!</h1>');
    // res.send({
    //     name: 'Me',
    //     other: [
    //         'Other1',
    //         'Other2'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home page',
        currentYear: new Date().getFullYear(),
        welcome: 'Welcome to the home page.'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error!'
    });
});

app.listen(3000);