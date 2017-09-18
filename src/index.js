import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import configureStore from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ScriptLoader from './services/ScriptLoader';
// import Routes from './routes';
import App from './components/App';
import theme from './theme';
// import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
const osMapUrl = 'https://openspace.ordnancesurvey.co.uk/osmapapi/openspace.js?key=A73F02BD5E3B3B3AE0405F0AC8602805&v=4.0.0';
const gMapUrl = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCdO3MslwXdEbrdHk9u3O0vRhysQu1mE18';
const scripts = [osMapUrl, gMapUrl];
const scriptLoader = new ScriptLoader();

const loadScripts = () => {
    const loadPromises = scripts.map(scriptLoader.load);
    Promise.all(loadPromises)
        .then(() => {
            store.dispatch({ type: 'OS_SCRIPT_LOADED' });
            store.dispatch({ type: 'GOOGLE_SCRIPT_LOADED' });
        })
        .catch(err => console.error('Script not found:', err));
}

// Needed for onTouchTap 
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);

loadScripts();

// registerServiceWorker();
