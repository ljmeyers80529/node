const yargs = require("yargs");
const geocode = require("./geocode/geocode");

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
        console.log(console.errorMessage);
    } else {
        console.log(JSON.stringify(results));
    }
});