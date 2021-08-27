/**
 * Module dependencies.
 */

import { isValid, mask } from '../src';

/**
 * `Social Security Number` samples.
 */

const numbers = {
    invalid: ['011-234-567', '011#23#4567', '011  23--4567', '0-1-1    234567', '078051120', '219099999', '457555462'],
    valid: ['011-23-4567', '011-23 4567', '011 23 4567', '011234567']
};

/**
 * Test `ssn-validator`.
 */

describe('SsnValidator', () => {
    describe('isValid()', () => {
        it('should return `false` if number is invalid', () => {
            numbers.invalid.forEach(number => expect(isValid(number)).toBe(false));
        });

        it('should return `true` if number is valid', () => {
            numbers.valid.forEach(number => expect(isValid(number)).toBe(true));
        });
    });

    describe('mask()', () => {
        it('should throw an error if value is invalid', () => {
            try {
                mask(numbers.invalid[0]);

                fail('Test should not reach this');
            } catch (e) {
                expect(e).toBeInstanceOf(Error);
                expect(e.message).toBe('Invalid Social Security Number');
            }
        });

        it('should mask a valid value', () => {
            expect(mask(numbers.valid[0])).toBe('XXX-XX-4567');
            expect(mask(numbers.valid[1])).toBe('XXX-XX 4567');
            expect(mask(numbers.valid[2])).toBe('XXX XX 4567');
            expect(mask(numbers.valid[3])).toBe('XXXXX4567');
        });

        it('should mask all digits', () => {
            expect(mask(numbers.valid[0], 'allDigits')).toBe('XXX-XX-XXXX');
            expect(mask(numbers.valid[1], 'allDigits')).toBe('XXX-XX XXXX');
            expect(mask(numbers.valid[2], 'allDigits')).toBe('XXX XX XXXX');
            expect(mask(numbers.valid[3], 'allDigits')).toBe('XXXXXXXXX');
        })
    });
});
