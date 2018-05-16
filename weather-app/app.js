const request = require("request");
const yargs = require("yargs");

const apiKey = 'AIzaSyA6gAI24ZjS1ODBUaxW1PZDVORkWcG9dbU';
const mapURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather information for.',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

request({
    url: `${mapURL}${encodeURIComponent(argv.a)}&key=${apiKey}`,
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`longitude: ${body.results[0].geometry.location.lng}`);
});