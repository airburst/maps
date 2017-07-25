import {
  ADD_POINT,
  REMOVE_POINT,
  CLEAR_ROUTE,
  TOGGLE_FOLLOWS_ROADS
} from '../actions';

const initialSettings = {
  waypoints: [],
  track: [],
  followsRoads: false
};

const route = (state = initialSettings, action) => {
  switch (action.type) {

    case ADD_POINT:
      return Object.assign({}, state, {
        waypoints: [...state.waypoints].concat(action.payload)
      });

    case REMOVE_POINT:
      return Object.assign({}, state, {
        waypoints: [...state.waypoints].slice(0, state.waypoints.length - 1)
      });

    case CLEAR_ROUTE:
      return Object.assign({}, state, { waypoints: [] });

    case TOGGLE_FOLLOWS_ROADS:
      return Object.assign({}, state, { followsRoads: !state.followsRoads });

    default:
      return state;
  }
}

export default route;
