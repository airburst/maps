export const ADD_POINT = 'ADD_POINT';
export const REMOVE_POINT = 'REMOVE_POINT';
export const CLEAR_ROUTE = 'CLEAR_ROUTE';
export const ADD_TRACK = 'ADD_TRACK';
export const TOGGLE_FOLLOWS_ROADS = 'TOGGLE_FOLLOWS_ROADS';

export const addPoint = (point) => {
  return {
    type: ADD_POINT,
    payload: point
  };
}

export const removePoint = (point) => {
  return {
    type: REMOVE_POINT,
    payload: point
  };
}

export const clearRoute = () => {
  return {
    type: CLEAR_ROUTE
  };
}

export const addTrack = (track) => {
  return {
    type: ADD_TRACK,
    payload: track
  };
}

export const toggleFollowsRoads = () => {
  return {
    type: TOGGLE_FOLLOWS_ROADS
  };
}
