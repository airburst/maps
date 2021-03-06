import GeoCodeService from '../services/GeoCodeService';
// import { setMapCentre } from './index';

export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const setSearchText = (text) => {
  return {
    type: SET_SEARCH_TEXT,
    payload: text
  };
}

export const LOAD_SEARCH_RESULTS = 'LOAD_SEARCH_RESULTS';
export const loadSearchResults = (results) => {
  return {
    type: LOAD_SEARCH_RESULTS,
    payload: results
  };
}
export const setSearchResults = place => dispatch => {
  new GeoCodeService(dispatch).find(place);
}

export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const clearSearchResults = () => {
  return {
    type: CLEAR_SEARCH_RESULTS
  };
}

export const searchPlace = place => dispatch => {
  new GeoCodeService(dispatch, false).find(place);
}

export const searchAndSet = place => dispatch => {
  new GeoCodeService(dispatch, true).find(place);
}

export const resetSearch = () => dispatch => {
  dispatch(setSearchText(''));
  dispatch(clearSearchResults());
}
