import State from '@src/State';

function stringifyState(state: unknown): string {
    return JSON.stringify(state, undefined, '    ');
}

describe('State', () => {
    const pureValues = ['state string', 666, 666.666, true, false, undefined, NaN, null];
    const validEntities = [[], {}];
    const notValidEntities = [Symbol('sym'), /w/, () => {}];
    const entities = [...validEntities, ...notValidEntities];

    describe('isPure', () => {
        const { isPure } = State;
        it('should return false for pure values', () => {
            for (const value of pureValues) {
                expect(isPure(value)).toBe(true);
            }
        });
        it('should return false for entities', () => {
            for (const value of entities) {
                expect(isPure(value)).toBe(false);
            }
        });
    });

    describe('makeFlatState', () => {
        const { makeFlatState } = State;
        it ('with pure', () => {
            for (const value of pureValues) {
                const flatState = makeFlatState(value);
                expect(flatState).toEqual({
                    state: value,
                    statePath: []
                });
            }
        });
        it('should create state for with valid entities', () => {
            for (const value of validEntities) {
                const flatState = makeFlatState(value);
                expect(flatState).toEqual({
                    state: {},
                    statePath: [],
                });
            }
        });
        it('should create state with undefined for not valid entities', () => {
            for (const value of notValidEntities) {
                const flatState = makeFlatState(value);
                expect(flatState).toEqual({
                    state: undefined,
                    statePath: [],
                });
            }
        });
        it('should create state for nested object in array', () => {
            const rawState = [1, '2', false, /w/, [3],
                {
                    propA: 1,
                    propB: 'some prop',
                    propC: true,
                    propD: () => {},
                    propE: ['1'],
                    propF: {
                        someProp: 1,
                    },
                }
            ];
            const flatState = makeFlatState(rawState);
            expect(Object.keys(flatState.state)).toHaveLength(11);
            expect(stringifyState(flatState)).toMatchSnapshot();
        });
    });

    describe('get', () => {
        it('shoult return correct value for pure field', () => {
            for (const value of pureValues) {
                const state = new State(value);
                expect(state.get() === value)
            }
        });
        it('should return empty entites', () => {
            for (const value of validEntities) {
                const state = new State(value);
                expect(state.get() === {});
            }
        });
        it('should return undefined for not valid entites', () => {
            for (const value of notValidEntities) {
                const state = new State(value);
                expect(state.get() === undefined);
            }
        });
    });
});
