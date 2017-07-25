import ElevationService from '../services/ElevationService';

export const ADD_POINT = 'ADD_POINT';
export const addPoint = (point) => {
  return {
    type: ADD_POINT,
    payload: point
  };
}

export const REMOVE_POINT = 'REMOVE_POINT';
export const removePoint = (point) => {
  return {
    type: REMOVE_POINT,
    payload: point
  };
}

export const CLEAR_ROUTE = 'CLEAR_ROUTE';
export const clearRoute = () => {
  return {
    type: CLEAR_ROUTE
  };
}

export const ADD_TRACK = 'ADD_TRACK';
export const addTrack = (track) => {
  return {
    type: ADD_TRACK,
    payload: track
  };
}

export const UPDATE_TRACK = 'UPDATE_TRACK';
export const updateTrack = (track) => {
  return {
    type: UPDATE_TRACK,
    payload: track
  };
}

export const addTrackAndGetElevation = (track) => {
  return dispatch => {
    dispatch(addTrack(track));
    const ele = new ElevationService();
    ele.getElevationData(track)
      .then(({ elevation, track }) => {
        dispatch(addElevation(elevation));
        if(track) { dispatch(updateTrack(track)); }
      })
      .catch(err => console.log('Error fetching elevation data', err));
  }
}

export const TOGGLE_FOLLOWS_ROADS = 'TOGGLE_FOLLOWS_ROADS';
export const toggleFollowsRoads = () => {
  return {
    type: TOGGLE_FOLLOWS_ROADS
  };
}

export const ADD_ELEVATION = 'ADD_ELEVATION';
export const addElevation = (elevation) => {
  return {
    type: ADD_ELEVATION,
    payload: elevation
  };
}
