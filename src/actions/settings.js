import { resetSearch } from './index';
export const OS_SCRIPT_LOADED = 'OS_SCRIPT_LOADED';
export const GOOGLE_SCRIPT_LOADED = 'GOOGLE_SCRIPT_LOADED';
export const SET_ZOOM = 'SET_ZOOM';
export const SET_COORDS = 'SET_COORDS';
export const TOGGLE_SHOW_ELEVATION = 'TOGGLE_SHOW_ELEVATION';
export const HIDE_ELEVATION = 'HIDE_ELEVATION';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const setCoords = coords => {
    return {
        type: SET_COORDS,
        payload: coords
    };
}

export const setZoom = zoom => {
    return {
        type: SET_ZOOM,
        payload: zoom
    };
}

export const toggleElevation = () => {
    return {
        type: TOGGLE_SHOW_ELEVATION
    };
}

export const hideElevation = () => {
    return {
        type: HIDE_ELEVATION
    };
}

export const showModal = type => {
    return {
        type: SHOW_MODAL,
        payload: type
    };
}

export const hideModal = type => {
    return {
        type: HIDE_MODAL,
        payload: type
    };
}

export const setMapCentre = (coords, zoom = 7) => dispatch => {
    dispatch(setCoords(coords));
    dispatch(setZoom(zoom));
    dispatch(resetSearch());
}

export const setError = error => {
    return {
        type: SET_ERROR,
        payload: error
    }
}

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}
