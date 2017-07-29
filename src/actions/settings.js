export const OS_SCRIPT_LOADED = 'OS_SCRIPT_LOADED';
export const GOOGLE_SCRIPT_LOADED = 'GOOGLE_SCRIPT_LOADED';
export const SET_ZOOM = 'SET_ZOOM';
export const SET_COORDS = 'SET_COORDS';

export const setCoords = coords => {
    return {
        type: SET_COORDS,
        payload: coords
    };
}

// export const setMapCentre = coords => dispatch => {
//     return dispatch(setCoords(coords));
// }
