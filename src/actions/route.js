export const ADD_POINT = 'ADD_POINT';
export const REMOVE_POINT = 'REMOVE_POINT';
export const CLEAR_ROUTE = 'CLEAR_ROUTE';
export const SET_MODE = 'SET_MODE';

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

export const setModeToWalk = () => {
  return {
    type: SET_MODE,
    payload: 'WALK'
  };
}

export const setModeToBike = () => {
  return {
    type: SET_MODE,
    payload: 'BIKE'
  };
}