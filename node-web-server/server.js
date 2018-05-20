const express = require('express');
const hvs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '\\public')); // loalhost:xxxx/help.html

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
        currentYear: new Date().getFullYear(),
        welcome: 'Welcome to the home page, this is now sunday.'
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