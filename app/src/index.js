import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const hello = <h1>Hello, world!</h1>;

ReactDOM.render(hello, document.getElementById('root'));
registerServiceWorker();
