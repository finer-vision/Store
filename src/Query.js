export default class Query {
    /**
     * TODO: Add description
     *
     * @param {String} query
     * @param {*=} defaultValue
     * @returns {*}
     */
    match(query, defaultValue = []) {
        let queryParts = query.split('.*.');

        // need all...
        if (queryParts.length === 0) {
            queryParts = query.split('*.'); // in the begining

        }

        if (queryParts.length === 0) {
            queryParts = query.split('.*'); // in the end
        }

        if (queryParts.length === 0) { // just a *
            return STATE;
        }

        if (queryParts.length === 2) {
            // TODO: Finish this.
        }

        return defaultValue;
    }
}
