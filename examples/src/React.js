import React, {Component} from "react";
import {render} from "react-dom";
import Store from "../../src";

class Counter extends Component {
    constructor(props) {
        super(props);

        this.subscriptions = [];

        this.state = {
            counter: 0
        };
    }

    componentDidMount() {
        const subscription = Store.subscribe('update', store => {
            if (store.hasOwnProperty('counter')) {
                this.setState({counter: store.counter});
            }

            console.log('Store.update', store);
        });

        this.subscriptions.push(subscription);

        Store.set({counter: this.state.counter});
    }

    componentWillUnmount() {
        this.subscriptions.map(subscription => Store.unSubscribe(subscription));
    }

    increment() {
        Store.set({counter: this.state.counter + 1});
    }

    decrement() {
        Store.set({counter: this.state.counter - 1});
    }

    render() {
        return (
            <div>
                <div>{this.state.counter}</div>
                <button onClick={() => this.increment()}>Increment</button>
                <button onClick={() => this.decrement()}>Decrement</button>
            </div>
        );
    }
}

const path = window.location.pathname.replace(/.*?examples\/?/, '');

if (path === 'react.html') {
    render(<Counter/>, document.querySelector('#app'));
}
