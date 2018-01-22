import Store from "../src";

Store.set({counter: 0});

const counter = document.querySelector('#counter');
const increment = document.querySelector('#increment');
const decrement = document.querySelector('#decrement');

increment.addEventListener('click', () => {
    Store.set({counter: Store.get('counter') + 1});
    counter.innerText = Store.get('counter');
});

decrement.addEventListener('click', () => {
    Store.set({counter: Store.get('counter') - 1});
    counter.innerText = Store.get('counter');
});

Store.subscribe('update', state => {
    console.log('state was updated', state);
});
