const request = require("request");

const mapApiKey = 'AIzaSyA6gAI24ZjS1ODBUaxW1PZDVORkWcG9dbU';
const weatherApiKey = '21f238b06606388865ecea8de8b50472';

const mapURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const weatherURL = `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${long}`


var geocodeAddress = (addr, callback) => {
    var locURL = `${mapURL}${encodeURIComponent(addr)}&key=${mapApiKey}`;
    request({
        url: locURL,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable to connect.");
        } else if (body.status === 'ZERO_RESULTS') {
            callback("Unable to find that address.");
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                lonitude: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = { geocodeAddress };