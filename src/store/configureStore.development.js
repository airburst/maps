import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import localForage from 'localforage';
// import { createLogger } from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist';
import reducer from '../reducers';

// const logger = createLogger({
//   level: 'info',
//   collapsed: true,
// });

// redux persist config
const persistConfig = {
  storage: localForage
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  // applyMiddleware(thunk, logger)
  applyMiddleware(thunk),
  autoRehydrate()
);

export default (initialState = {}) => {
  const store = createStore(reducer, initialState, enhancers);
  persistStore(store, persistConfig);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    });
  }

  return store;
}
