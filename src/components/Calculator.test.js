import {render, screen} from '@testing-library/react';
import Calculator, {calculate, cleanExpression} from './Calculator';

describe('Calculator', () => {
    describe('cleanExpression', () => {
        it('should remove in-valid characters from math expression', () => {
            expect(cleanExpression('(2 + 4)')).toBe('(2+4)');
        })
    })
    describe('calculate', () => {
        it('should be able to add numbers', () => {
            expect(calculate('2+4')).toBe('6');
        })
        it('should be able to calculate exponents', () => {
            expect(calculate('10^3')).toBe('1000');
        })
        it('should be able to evaluate parenthesis', () => {
            expect(calculate('(1+1)*2')).toBe('4');
        })
    })
    //TODO: Add test for component
})
