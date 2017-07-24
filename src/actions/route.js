export const ADD_POINT = 'ADD_POINT';

export const addPoint = (point) => {
  return {
    type: ADD_POINT,
    payload: point
  };
}
