const yargs = require("yargs");
const axios = require("axios");

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


const mapApiKey = 'AIzaSyA6gAI24ZjS1ODBUaxW1PZDVORkWcG9dbU';
const mapURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

const weatherApiKey = '21f238b06606388865ecea8de8b50472';

var encodedAddress = encodeURIComponent(argv.address);
var locationUrl = `${mapURL}${encodeURIComponent(encodedAddress)}&key=${mapApiKey}`;

axios.get(locationUrl).then((response) => {
    if (response.data.status === "ZERO_RESULTS") {
        throw new Error("Unable to find address.");
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temp = response.data.currently.temperature;
    var feelsLikeTemp = response.data.currently.apparentTemperature
    console.log(`Current temp = ${temp}\tFeel like Temp = ${feelsLikeTemp}`);
}).catch((e) => {
    if (e.code === "ENOTFOUND") {
        console.log("Unable to connect to API service.");
    } else {
        console.log(e.message);
    }
    console.log(e);
});