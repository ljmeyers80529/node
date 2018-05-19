const req = require("request");
const weatherApiKey = '21f238b06606388865ecea8de8b50472';

var getWeather = (lat, long, callback) => {
    req({
        url: `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${long}`,
        // url: "https://api.darksky.net/forecast/21f238b06606388865ecea8de8b50472/36.7377981,-119.7871247",
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to server.");
        }
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                currentTemp: body.currently.temperature,
                feelsLikeTemp: body.currently.apparentTemperature
            });
        } else {
            callback("Unable to fetch weather information.");
        }
    });
}

module.exports = { getWeather };
//https: //api.darksky.net/forecast/21f238b06606388865ecea8de8b50472/36.7377981,-119.7871247