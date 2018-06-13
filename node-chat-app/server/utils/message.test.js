var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Me';
        var text = "Sample testing text";
        var message = generateMessage(from, text);

        expect(typeof(message.createdAt)).toBe('number');
        expect(message.text).toBe(text);
        expect(message.from).toBe(from);
        expect(message).toMatchObject({ from, text }); //same a above toBe's.
    });
});

describe('generate location message', () => {
    it('should generate correct location object', () => {
        var from = 'Me';
        var latitude = 36.7189465;
        var longitude = -119.6904745;
        var url = `https://www.google.com/maps/@${latitude},${longitude}`

        var message = generateLocationMessage(from, latitude, longitude);

        expect(typeof(message.createdAt)).toBe('number');
        expect(message).toMatchObject({ from, url }); //same a above toBe's.
    });
});