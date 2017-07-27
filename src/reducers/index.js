import { combineReducers } from 'redux';
import route from './route';
import settings from './settings';
import search from './search';

const reducer = combineReducers({
  route,
  settings,
  search
});

export default reducer;
