const SUBSCRIPTIONS = {};

export default class Subscription {
    /**
     * Listen to the given subscription and call the given func.
     *
     * @param {String} subscription
     * @param {Function} func
     * @returns {{key: String, index: Number}}
     */
    static subscribe(subscription, func) {
        if (typeof func !== 'function') {
            throw new Error('Second argument to the "on" method is not a function.');
        }

        if (!SUBSCRIPTIONS.hasOwnProperty(subscription)) {
            SUBSCRIPTIONS[subscription] = [];
        }

        SUBSCRIPTIONS[subscription].push(func);

        return {
            key: subscription,
            index: SUBSCRIPTIONS[subscription].length - 1
        };
    }

    /**
     * Unsubscribe from the given subscription.
     *
     * @param {String} key
     * @param {Number} index
     */
    static unSubscribe({key, index}) {
        if (SUBSCRIPTIONS.hasOwnProperty(key)) {
            SUBSCRIPTIONS[key].splice(index, 1);
        }
    }

    /**
     * Emit the given subscription from the SUBSCRIPTIONS object.
     * @param {String} subscription
     * @param {*=} data
     */
    static emit(subscription, data = null) {
        if (SUBSCRIPTIONS.hasOwnProperty(subscription)) {
            SUBSCRIPTIONS[subscription].map(subscription => {
                subscription(data);
            });
        }
    }
}
