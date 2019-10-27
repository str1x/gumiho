import State from '@src/State';

describe('State', () => {

    it('creates state', () => {
        const state = new State({test: 1});
        console.log(state);
    });
});
