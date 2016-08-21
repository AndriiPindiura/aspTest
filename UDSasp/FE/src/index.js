import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ES6Promise from 'es6-promise';
 ES6Promise.polyfill();
// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
