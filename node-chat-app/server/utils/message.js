var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};

var generateLocationMessage = (from, lat, long) => {
    return {
        from,
        createdAt: new Date().getTime(),
        url: `https://www.google.com/maps/@${lat},${long}`
    }
};

module.exports = { generateMessage, generateLocationMessage };