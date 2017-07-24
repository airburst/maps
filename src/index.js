import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import ScriptLoader from './services/ScriptLoader';
import AppContainer from './containers/AppContainer';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = configureStore();

const loadScripts = () => {
    new ScriptLoader().load('http://openspace.ordnancesurvey.co.uk/osmapapi/openspace.js?key=A73F02BD5E3B3B3AE0405F0AC8602805')
        .then(() => store.dispatch({ type: 'OS_SCRIPT_LOADED' }))
        .catch(err => console.log(err));
}

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);

loadScripts();

// registerServiceWorker();
