/* global Symbol */
import State from '@src/State';
import { isImmutable } from 'immutable';

describe('State', () => {
    it('creates immutable state', () => {
        const state = new State();
        expect(isImmutable(state._state)).toBe(true);
    });

    it('has public method get', () => {
        const state = new State();

        expect(typeof state.get).toBe('function');
    });

    it('has public method set', () => {
        const state = new State();

        expect(typeof state.get).toBe('function');
    });

    it('can get state property value', () => {
        const rawState = {
            num: 1,
            str: 'test',
            obj: {
                propA: 'some prop',
            },
            arr: ['one', 'two', 'three'],
        };
        const state = new State(rawState);
        expect(state.get()).toEqual(rawState);
        expect(state.get('num')).toEqual(rawState.num);
        expect(state.get('str')).toEqual(rawState.str);
        expect(state.get('str', 2)).toBeUndefined();
        expect(state.get('obj')).toEqual(rawState.obj);
        expect(state.get('obj', 'propA')).toEqual(rawState.obj.propA);
        expect(state.get('arr')).toEqual(rawState.arr);
        expect(state.get('arr', 2)).toEqual(rawState.arr[2]);
        expect(state.get('is_undef', 'no_no_no', 2)).toBeUndefined();
    });

    it('do not accept invalid root props in raw state', () => {
        const stateStr = new State('test_prop');
        expect(stateStr.get()).toBe('test_prop');
        const stateNumber = new State(1);
        expect(stateNumber.get()).toBe(1);
        const stateBool = new State(true);
        expect(stateBool.get()).toBe(true);
        const testFn = () => 'test_fn';
        console.log('-------------');
        const stateFn = new State(testFn);
        console.log(stateFn.get());
        expect(stateFn.get()).toEqual(testFn);
    });

    it('do not accept invalid nested props in raw state', () => {
        const state = new State({
            id: 1,
            name: 'test',
            status: false,
            testFn: () => 'gotcha',
            testSym: Symbol('foo'),
            testRegexp: /.*/,
            obj: {
                testFn: () => 'gotcha',
            },
            arr: [1, () => 'gotcha', 2],
        });
        expect(state.get()).toEqual({
            id: 1,
            name: 'test',
            status: false,
            obj: {},
            arr: [1,2],
        });
    });
});
