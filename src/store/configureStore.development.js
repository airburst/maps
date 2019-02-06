// import localForage from 'localforage';
import { applyMiddleware, compose, createStore } from 'redux';
// import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import reducer from '../reducers';

// redux persist config
// const persistConfig = {
//   storage: localForage
// };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(thunk)
  // autoRehydrate()
);

export default (initialState = {}) => {
  const store = createStore(reducer, initialState, enhancers);
  // persistStore(store, persistConfig);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers')); // eslint-disable-line global-require
    });
  }

  return store;
};
