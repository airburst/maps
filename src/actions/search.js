import GeoCodeService from '../services/GeoCodeService';

export const LOAD_SEARCH_RESULTS = 'LOAD_SEARCH_RESULTS';
export const loadSearchResults = (results) => {
  return {
    type: LOAD_SEARCH_RESULTS,
    payload: results
  };
}

export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const clearSearchResults = () => {
  return {
    type: CLEAR_SEARCH_RESULTS
  };
}

export const searchPlace = place => dispatch => {
  new GeoCodeService(dispatch).find(place);
}
