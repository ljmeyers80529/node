var moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};

var generateLocationMessage = (from, lat, long) => {
    return {
        from,
        createdAt: moment().valueOf(),
        url: `https://www.google.com/maps/@${lat},${long}`
    }
};

module.exports = { generateMessage, generateLocationMessage };