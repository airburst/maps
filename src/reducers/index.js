import { combineReducers } from 'redux';
import route from './route';
import settings from './settings';

const reducer = combineReducers({
  route,
  settings
});

export default reducer;
