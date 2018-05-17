// const yargs = require("yargs");
// const geocode = require("./geocode/geocode");

// const argv = yargs
//     .options({
//         a: {
//             demand: true,
//             alias: 'address',
//             describe: 'Address to fetch weather information for.',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv;

// geocode.geocodeAddress(argv.a, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(console.errorMessage);
//     } else {
//         console.log(JSON.stringify(results));
//     }
// });


const req = require("request");

req({
    url: 'https://api.darksky.net/forecast/21f238b06606388865ecea8de8b50472/36.7377981,-119.7871247',
    json: true

}, (error, response, body) => {
    if (error) {
        console.log("Unable to connect to server.");
    }
    if (!error && response.statusCode === 200) {
        console.log(`Current temp: ${body.currently.temperature}`);
    } else {
        console.log("Unable to fetch weather information.");
    }
});


//https: //api.darksky.net/forecast/21f238b06606388865ecea8de8b50472/36.7377981,-119.7871247