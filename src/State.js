import {
    fromJS,
    isImmutable,
    getIn,
} from 'immutable';

const validPropTypes = ['number', 'string', 'boolean'];

export default class State {

    constructor(rawState = {}) {
        this._state = State.normalize(rawState);
    }

    get(...args) {
        const value = getIn(this._state, args);
        return isImmutable(value) ? value.toJS() : value;
    }

    set() {

    }

    static normalize(rawState) {
        return fromJS(rawState, (key, value) => {
            console.log(value);
            if (isImmutable(value)) {
                return value.filter( i => {
                    return validPropTypes.includes(typeof i) || isImmutable(i);
                });
            }
            if (validPropTypes.includes(typeof value)) {
                return value;
            }
            return undefined;
        });
    }
}
