# FV Store

Fast and simple key = value storage

### Installation

```bash
npm install --save fv-store
```

### Usage

```js
import Store from "fv-store";

Store.set({
    user: {
        firstName: 'James',
        lastName: 'Craig'
    }
});

console.log(Store.get('user.firstName', 'defaultValue'));
```

### Subscriptions

Subscriptions are a way of listening for events on the store.

```js
const subscription = Store.subscribe('update', store => {
    console.log(store);
});

// If you are running a single page application, make sure you unsubscribe
// from an event when you are finished with it.
Store.unsubscribe(subscription);
```
