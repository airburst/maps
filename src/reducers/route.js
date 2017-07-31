import {
  ADD_POINT,
  REMOVE_POINT,
  CLEAR_ROUTE,
  ADD_TRACK,
  UPDATE_TRACK,
  UPDATE_DISTANCE,
  ADD_ELEVATION,
  TOGGLE_FOLLOWS_ROADS
} from '../actions';
import { distance, trunc } from '../services/GeometryService';
import { flatten } from '../services/utils';

const initialSettings = {
  waypoints: [],
  track: [],
  elevation: [],
  distance: 0,
  ascent: 0,
  followsRoads: true
};

const route = (state = initialSettings, { type, payload }) => {

  switch (type) {

    case ADD_POINT:
      return Object.assign({}, state, {
        waypoints: [...state.waypoints, payload]
      });

    case REMOVE_POINT:
      return Object.assign({}, state, {
        waypoints: [...state.waypoints].slice(0, state.waypoints.length - 1),
        track: [...state.track].slice(0, state.track.length - 1),
        elevation: [...state.elevation].slice(0, state.elevation.length - 1)
      });

    case CLEAR_ROUTE:
      return Object.assign({}, state, {
        waypoints: [],
        track: [],
        elevation: [],
        distance: 0,
        ascent: 0
      });

    case ADD_TRACK:
      return Object.assign({}, state, {
        track: [...state.track, payload]
      });

    case UPDATE_TRACK:
      const t = [...state.track].slice(0, state.track.length - 1);
      return Object.assign({}, state, {
        track: [...t, payload]
      });

    case UPDATE_DISTANCE:
      return Object.assign({}, state, {
        distance: trunc(distance(flatten(state.track)))
      });

    case ADD_ELEVATION:
      return Object.assign({}, state, {
        elevation: [...state.elevation, payload]
      });

    case TOGGLE_FOLLOWS_ROADS:
      return Object.assign({}, state, { followsRoads: !state.followsRoads });

    default:
      return state;
  }
}

export default route;
