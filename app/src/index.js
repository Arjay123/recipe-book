import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const hello = <h1>Hello, world!</h1>;

class App extends React.Component {
    render() {
        var classes = "recipe";
        return (
            <div className={classes}>
                    <Ingredients />
                    <Directions />
            </div>
        );
    }
}

class Ingredients extends React.Component {
    render() {
        var classes = "ingredients";
        return (
            <div className={classes}>
                Ingredients
            </div>
        );
    }
}

class Directions extends React.Component {
    render() {
        var classes = "directions";
        return (
            <div className={classes}>
                Directions
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
