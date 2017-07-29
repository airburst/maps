import {
  LOAD_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS
} from '../actions';

const initialSettings = {
  searchResults: {}
};

export default (state = initialSettings, { type, payload }) => {
  switch (type) {

    case LOAD_SEARCH_RESULTS:
      return Object.assign({}, state, { searchResults: payload });

    case CLEAR_SEARCH_RESULTS:
      return Object.assign({}, state, { searchResults: [] });

    default:
      return state;
  }
}
