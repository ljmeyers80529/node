var expect = require('expect');
var { generateMessage } = require('./message');

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