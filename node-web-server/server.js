const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '\\views\\partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '\\public')); // loalhost:xxxx/help.html


// middleware functions.
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maint.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// app.get('/', (req, res) => { // req = request, res = response           // simple output to web page with plain text.
//     res.send('<h1>Hello express!</h1>');
// });

// app.get('/', (req, res) => { // req = request, res = response           // send a JSON object to the web page.
//     res.send({
//         name: 'Me',
//         other: [
//             'Other1',
//             'Other2'
//         ]
//     });
// });

app.get('/', (req, res) => { // req = request, res = response           // send a templated page to the browser.
    res.render('home.hbs', {
        pageTitle: 'Home page',
        // currentYear: new Date().getFullYear(),                       // replaced with helper function (above).
        welcome: 'Welcome to the home page, this is now sunday.'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        // currentYear: new Date().getFullYear()
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error!'
    });
});

app.listen(3000);