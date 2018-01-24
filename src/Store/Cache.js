const CACHE = {};

export default class Cache {
    /**
     * Get the query {query, value} from the given object.
     *
     * @param {Object} object
     * @param {Array} query
     * @returns {Object}
     */
    static getQuery(object, query = []) {
        for (let key in object) {
            if (!object.hasOwnProperty(key)) {
                continue;
            }

            const value = object[key];

            // If "value" is an object recurse until it's not.
            if (!Array.isArray(value) && typeof value === 'object') {
                return Cache.getQuery(value, query.concat(key));
            }

            return {
                query: query.concat(key).join('.'),
                value
            };
        }
    };

    /**
     * Update the cache with the given state.
     *
     * @param {Object} state
     */
    static update(state) {
        const {query, value} = Cache.getQuery(state);
        CACHE[query] = value;
    }

    /**
     * Check if the cache has the given query.
     *
     * @param {String} query
     * @returns {boolean}
     */
    static has(query) {
        return CACHE.hasOwnProperty(query);
    }

    /**
     * Get the cache value from the given query.
     *
     * @param {String} query
     * @returns {*}
     */
    static get(query) {
        return CACHE[query];
    }

    /**
     * Set the state to the cache with the given query.
     *
     * @param {String} query
     * @param {Object} state
     */
    static set(query, state) {
        CACHE[query] = state;
    }
}
