export {
    OS_SCRIPT_LOADED,
    GOOGLE_SCRIPT_LOADED,
    SET_COORDS,
    SET_ZOOM,
    TOGGLE_SHOW_ELEVATION,
    setCoords,
    setMapCentre,
    toggleElevation
} from './settings';

export {
    ADD_POINT,
    REMOVE_POINT,
    CLEAR_ROUTE,
    ADD_TRACK,
    UPDATE_TRACK,
    TOGGLE_FOLLOWS_ROADS,
    ADD_ELEVATION,
    addPoint,
    removePoint,
    clearRoute,
    addTrack,
    updateTrack,
    addTrackAndGetElevation,
    toggleFollowsRoads,
    addElevation
} from './route';

export {
    LOAD_SEARCH_RESULTS,
    CLEAR_SEARCH_RESULTS,
    SET_SEARCH_TEXT,
    searchPlace,
    searchAndSet,
    loadSearchResults,
    clearSearchResults,
    setSearchText,
    resetSearch
} from './search.js';