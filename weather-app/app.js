const request = require("request");

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=550%20s%20walling%20ave%20fresno%20ca',
    json: true
}, (error, response, body) => {
    console.log(body);
});