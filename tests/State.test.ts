import State from '@src/State';

describe('State', () => {

    it('isPure static method', () => {
        const { isPure } = State;
        // pure
        expect(isPure('some string')).toBe(true);
        expect(isPure(666)).toBe(true);
        expect(isPure(666.666)).toBe(true);
        expect(isPure(true)).toBe(true);
        expect(isPure(false)).toBe(true);
        expect(isPure(undefined)).toBe(true);
        expect(isPure(NaN)).toBe(true);
        expect(isPure(null)).toBe(true);
        // not pure
        expect(isPure(() => {})).toBe(false);
        expect(isPure(/w/)).toBe(false);
        expect(isPure(Symbol('sym'))).toBe(false);
        expect(isPure({})).toBe(false);
        expect(isPure([])).toBe(false);
    })
});
