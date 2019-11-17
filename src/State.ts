type PureType = string|number|boolean|undefined|null;
interface FlatState {
    [key: string]: PureType;
};
interface Config {
    pathSeparator: string;
    typeSeparator: string;
}
const pureTypes = ['string', 'number', 'boolean'];

export default class State {
    private _state: FlatState | PureType = {};
    private _config: Config = {
        pathSeparator: '/',
        typeSeparator: '#',
    };

    constructor(rawState: unknown) {
        const {state} = State.makeFlatState(rawState);
        this._state = state;
    }

    static isPure(value: unknown): boolean {
        if (
            pureTypes.includes(typeof value)
            || value === undefined
            || value === null
        ) {
            value as PureType;
            return true;
        }
        return false;
    }

    static makeFlatState(
        rawState: unknown | {[key: string]: unknown}, 
        rootState: FlatState = {}, 
        pathSeparator = '/', 
        typeSeparator = '#', 
        pathTo: Array<string> = []
    ): {
        state: FlatState | PureType; 
        statePath: Array<string> | null;
    } {
        let type: 'array' | 'object' | null = null;
        
        if (State.isPure(rawState)) {
            const state = rawState as PureType;
            
            return {
                state,
                statePath: pathTo,
            };
        }
        else if (Array.isArray(rawState)) {
            type = 'array';
        }
        else if (rawState.toString() === '[object Object]') {
            type = 'object';
        }

        if (type === null) {
            return {
                state: undefined,
                statePath: pathTo,
            };
        }
        else {
            let path = [...pathTo];
            path[path.length - 1] = `${type}${typeSeparator}${path[path.length - 1]}`;
            if (!path.length) {
                path = [`${type}${typeSeparator}`];
            }
            const keys = Object.keys(rawState);
            keys.forEach((key) => {
                const {state, statePath} = State.makeFlatState(
                    (rawState as {[key: string]: unknown})[key],
                    rootState,
                    pathSeparator,
                    typeSeparator,
                    [...path, key],
                );
                if (statePath.length) {
                    rootState[statePath.join(pathSeparator)] = state as PureType;
                }
            });
            return {
                state: rootState,
                statePath: [],
            };
        }
    }
}
