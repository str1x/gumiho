import State from '@src/State';

function stringifyState(state: unknown): string {
    return JSON.stringify(state, undefined, '    ');
}

describe('State', () => {
    const pureValues = ['state string', 666, 666.666, true, false, undefined, NaN, null];
    const validEntities = [[], {}];
    const notValidEntities = [Symbol('sym'), /w/, () => {}];
    const entities = [...validEntities, ...notValidEntities];

    describe('isPure static method', () => {
        const { isPure } = State;
        it('with pure', () => {
            for (const value of pureValues) {
                expect(isPure(value)).toBe(true);
            }
        });
        it('with entities', () => {
            for (const value of entities) {
                expect(isPure(value)).toBe(false);
            }
        });
    });

    describe('makeFlatState static method', () => {
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
        it('with valid entities', () => {
            for (const value of validEntities) {
                const flatState = makeFlatState(value);
                expect(flatState).toEqual({
                    state: {},
                    statePath: [],
                });
            }
        });
        it('with not valid entities', () => {
            for (const value of notValidEntities) {
                const flatState = makeFlatState(value);
                expect(flatState).toEqual({
                    state: undefined,
                    statePath: [],
                });
            }
        });
        it('with nested object in array', () => {
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
            console.log(flatState);
            expect(Object.keys(flatState.state)).toHaveLength(11);
            expect(stringifyState(flatState)).toMatchSnapshot();
        });
    });
});
