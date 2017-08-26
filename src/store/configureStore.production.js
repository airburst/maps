import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { hashHistory } from 'react-router';
// import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducers';

// const router = routerMiddleware(hashHistory);
// const enhancer = applyMiddleware(thunk, router);
const enhancer = applyMiddleware(thunk);

export default function configureStore(initialState = {}) {
  return createStore(reducer, initialState, enhancer);
}

// Need to add redux-persist
