import {
  LOAD_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS,
  SET_SEARCH_TEXT
} from '../actions';

const initialSettings = {
  searchText: '',
  searchResults: null
};

export default (state = initialSettings, { type, payload }) => {
  switch (type) {

    case SET_SEARCH_TEXT:
      return Object.assign({}, state, { searchText: payload });

    case LOAD_SEARCH_RESULTS:
      return Object.assign({}, state, { searchResults: payload });

    case CLEAR_SEARCH_RESULTS:
      return Object.assign({}, state, { searchResults: null, searchText: '' });

    default:
      return state;
  }
}
