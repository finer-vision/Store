import Store from "../src";

Store.set({example: 'Example store value'});

console.log(Store.get('example'));
