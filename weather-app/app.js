const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

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

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMsg, tResults) => {
            if (errorMsg) {
                console.log(errorMsg);
            } else {
                console.log(`Current temp = ${tResults.currentTemp}\tFeel like Temp = ${tResults.feelsLikeTemp}`);
            }
        });
    }
});