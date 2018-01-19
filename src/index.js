import Cache from "./Cache";

class Store {
    constructor() {
        this.state = {};
    }

    /**
     * Set the state with the given state object.
     *
     * @param {Object} state
     */
    set(state = {}) {
        Object.assign(this.state, state);
        Cache.update(state);
    }

    /**
     * Get the state value from the given query. If no results are returned
     * from the query then the defaultValue will be returned.
     *
     * @param {String} query
     * @param {*=} defaultValue
     */
    get(query, defaultValue = null) {
        if (Cache.has(query)) {
            return Cache.get(query);
        }

        const keys = String(query).split('.');
        let state = this.state;

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (!state.hasOwnProperty(key)) {
                return defaultValue;
            }
            state = state[key];
        }

        Cache.set(query, state);

        return state;
    }
}

export default new Store();
