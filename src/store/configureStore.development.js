import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist';
import reducer from '../reducers';

// const logger = createLogger({
//   level: 'info',
//   collapsed: true,
// });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  // applyMiddleware(thunk, logger)
  applyMiddleware(thunk),
  autoRehydrate()
);

export default (initialState = {}) => {
  const store = createStore(reducer, initialState, enhancers);
  persistStore(store);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    });
  }

  return store;
}
