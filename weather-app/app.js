const request = require("request");
const apiKey = 'AIzaSyA6gAI24ZjS1ODBUaxW1PZDVORkWcG9dbU';

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=550%20s%20walling%20ave%20fresno%20ca' + '&key=' + apiKey,
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`longitude: ${body.results[0].geometry.location.lng}`);
});