import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import localForage from 'localforage';
import {persistStore, autoRehydrate} from 'redux-persist';
import reducer from '../reducers';

const persistConfig = {
  storage: localForage
};
const enhancer = applyMiddleware(thunk);

export default function configureStore(initialState = {}) {
  const store = createStore(reducer, initialState, enhancers);
  persistStore(store, persistConfig);
  return store;
}
