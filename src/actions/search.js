import GeoCodeService from '../services/GeoCodeService';
const geo = new GeoCodeService(process.env.GOOGLE_API_KEY);

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
  geo.find(place)
    .then(results => dispatch(loadSearchResults(results)))
    .catch(err => console.log(err));
}
