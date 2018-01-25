import Cache from "./Cache";
import Query from "./Query";
import Subscription from "./Subscription";

const STATE = {};

export default class Store {
    /**
     * Listen to the given subscription and call the given func.
     *
     * @param {String} subscription
     * @param {Function} func
     * @returns {{key: String, index: Number}}
     */
    static subscribe(subscription, func) {
        Subscription.subscribe(subscription, func);
    }

    /**
     * Unsubscribe from the given subscription.
     *
     * @param {String} key
     * @param {Number} index
     */
    static unSubscribe({key, index}) {
        Subscription.unSubscribe({key, index});
    }

    /**
     * Set the state with the given state object.
     *
     * @param {Object} state
     */
    static set(state = {}) {
        Object.assign(STATE, state);
        Cache.update(state);
        Subscription.emit('update', STATE);
    }

    /**
     * Get the state value from the given query. If no results are returned
     * from the query then the defaultValue will be returned.
     *
     * @param {String} query
     * @param {*=} defaultValue
     */
    static get(query, defaultValue = null) {

        if (query.indexOf('*') >= 0) {
            return Query.match(query, defaultValue);
        }

        if (Cache.has(query)) {
            return Cache.get(query);
        }

        const keys = String(query).split('.');
        let state = STATE;

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

    /**
     * Unset the given query from the cache.
     *
     * @param {String} query
     */
    static unset(query) {
        Cache.unset(query);
        Subscription.emit('update', STATE);
    }
}
