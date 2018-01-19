import Store from "../src";

const subscription = Store.subscribe('update', state => {
    console.log('state was updated', state);
});

Store.set({example: 'Example store value'});

console.log(Store.get('example'));

Store.unSubscribe(subscription);
