import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

// ReactDOM.render(
//     <AppContainer>
//         <Provider store={store}>
//             <Component />
//         </Provider>
//     </AppContainer>,
//     document.getElementById('app')
// );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

// ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
