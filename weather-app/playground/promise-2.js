const request = require("request");

const mapApiKey = 'AIzaSyA6gAI24ZjS1ODBUaxW1PZDVORkWcG9dbU';

const mapURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

var geocodeAddress = (address) => {
    var locURL = `${mapURL}${encodeURIComponent(address)}&key=${mapApiKey}`;
    return new Promise((resolve, reject) => {
        request({
            url: locURL,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject("Unable to connect.");
            } else if (body.status === 'ZERO_RESULTS') {
                reject("Unable to find that address.");
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress('93727').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMsg) => {
    console.log(errorMsg);
});