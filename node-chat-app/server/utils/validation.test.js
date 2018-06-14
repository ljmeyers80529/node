const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const test = isRealString(98);
        expect(test).toBe(false);
    });

    it('should reject string with only spaces', () => {
        const test = isRealString('');
        expect(test).toBe(false);
    });

    it('should allow strings with non-space characters', () => {
        const test = isRealString(' f f ');
        expect(test).toBe(true);
    });
})