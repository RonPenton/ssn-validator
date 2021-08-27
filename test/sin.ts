/**
 * Module dependencies.
 */

import { sin } from '../src';

/**
 * `Social Security Number` samples.
 */

const numbers = {
    invalid: ['1a3456789', '12345678', '1234567891', '123456789', '123-456-789', ' 123 456 789 '],
    valid: ['130 692 544', '130-692-544', '130692544']
};

/**
 * Test `ssn-validator`.
 */

describe('SinValidator', () => {
    describe('isValid()', () => {
        it('should return `false` if number is invalid', () => {
            numbers.invalid.forEach(number => expect(sin.isValid(number)).toBe(false));
        });

        it('should return `true` if number is valid', () => {
            numbers.valid.forEach(number => expect(sin.isValid(number)).toBe(true));
        });
    });

    describe('mask()', () => {
        it('should throw an error if value is invalid', () => {
            try {
                sin.mask(numbers.invalid[0]);

                fail('Test should not reach this');
            } catch (e: any) {
                expect(e).toBeInstanceOf(Error);
                expect(e.message).toBe('Invalid Social Insurance Number');
            }
        });

        it('should mask a valid value', () => {
            expect(sin.mask(numbers.valid[0])).toBe('XXX XXX 544');
            expect(sin.mask(numbers.valid[1])).toBe('XXX-XXX-544');
            expect(sin.mask(numbers.valid[2])).toBe('XXXXXX544');
        });

        it('should mask all digits', () => {
            expect(sin.mask(numbers.valid[0], 'full')).toBe('XXX XXX XXX');
            expect(sin.mask(numbers.valid[1], 'full')).toBe('XXX-XXX-XXX');
            expect(sin.mask(numbers.valid[2], 'full')).toBe('XXXXXXXXX');
        })
    });
});
