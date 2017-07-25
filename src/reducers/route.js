import {
  ADD_POINT,
  REMOVE_POINT,
  CLEAR_ROUTE,
  ADD_TRACK,
  UPDATE_TRACK,
  ADD_ELEVATION,
  TOGGLE_FOLLOWS_ROADS
} from '../actions';

const initialSettings = {
  waypoints: [],
  track: [],
  elevation: [],
  followsRoads: false
};

const route = (state = initialSettings, action) => {

  switch (action.type) {

    case ADD_POINT:
      return Object.assign({}, state, {
        waypoints: [...state.waypoints, action.payload]
      });

    case REMOVE_POINT:
      return Object.assign({}, state, {
        waypoints: [...state.waypoints].slice(0, state.waypoints.length - 1),
        track: [...state.track].slice(0, state.track.length - 1),
        elevation: [...state.elevation].slice(0, state.elevation.length - 1),
      });

    case CLEAR_ROUTE:
      return Object.assign({}, state, { waypoints: [], track: [], elevation: [] });

    case ADD_TRACK:
      return Object.assign({}, state, {
        track: [...state.track, action.payload]
      });

    case UPDATE_TRACK:
      const t = [...state.track].slice(0, state.track.length - 1);
      return Object.assign({}, state, {
        track: [...t, action.payload]
      });

    case ADD_ELEVATION:
      return Object.assign({}, state, {
        elevation: [...state.elevation, action.payload]
      });

    case TOGGLE_FOLLOWS_ROADS:
      return Object.assign({}, state, { followsRoads: !state.followsRoads });

    default:
      return state;
  }
}

export default route;
