export default class Store {
    constructor({
        name = '',
        state = {},
        mutations = {},
        actions = {},
        selectors = {},
    }) {
        this.name = name;
        this.state = state;
        this.mutations = mutations;
        this.actions = actions;
        this.selectors = selectors;
    }

}
