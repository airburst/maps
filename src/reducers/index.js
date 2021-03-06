import { combineReducers } from 'redux';
import user from './user';
import route from './route';
import settings from './settings';
import search from './search';

const reducer = combineReducers({
  user,
  route,
  settings,
  search
});

export default reducer;
