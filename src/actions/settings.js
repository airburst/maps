import { resetSearch } from './index';
export const OS_SCRIPT_LOADED = 'OS_SCRIPT_LOADED';
export const GOOGLE_SCRIPT_LOADED = 'GOOGLE_SCRIPT_LOADED';
export const SET_ZOOM = 'SET_ZOOM';
export const SET_COORDS = 'SET_COORDS';
export const TOGGLE_SHOW_ELEVATION = 'TOGGLE_SHOW_ELEVATION';
export const HIDE_ELEVATION = 'HIDE_ELEVATION';

export const setCoords = coords => {
    return {
        type: SET_COORDS,
        payload: coords
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

export const setMapCentre = coords => dispatch => {
    dispatch(setCoords(coords));
    dispatch(resetSearch());
}
