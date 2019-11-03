const pureTypes = ['string', 'number', 'boolean'];
export default class State {
    _state: any;
    constructor(state: any) {
        this._state = state;
    }

    static isPure(value: unknown): boolean {
        if (
            pureTypes.includes(typeof value)
            || value === undefined
            || value === null
        ) {
            return true;
        }
        return false;
    }
}
