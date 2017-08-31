import {
  ADD_POINT,
  REMOVE_POINT,
  CLEAR_ROUTE,
  SET_ROUTE,
  ADD_TRACK,
  UPDATE_TRACK,
  UPDATE_ASCENT,
  UPDATE_DISTANCE,
  ADD_ELEVATION,
  TOGGLE_FOLLOWS_ROADS,
  SHOW_POINT,
  SET_NAME
} from '../actions';
import { distance, totalAscent, trunc } from '../services/GeometryService';
import { flatten } from '../services/utils';

const initialSettings = {
  name: 'New Route',
  waypoints: [],
  track: [],
  elevation: [],
  distance: 0,
  ascent: 0,
  followsRoads: true,
  showPoint: null
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
      return Object.assign({}, state, initialSettings);

    case SET_ROUTE:
      return Object.assign({}, state, payload, { waypoints: [] });    //

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

    case UPDATE_ASCENT:
      return Object.assign({}, state, {
        ascent: trunc(totalAscent(flatten(state.elevation)), 0)
      });

    case ADD_ELEVATION:
      const eLen = state.elevation.length;
      const lastDistance = (eLen === 0) ? 0 :
        state.elevation[eLen - 1][state.elevation[eLen - 1].length - 1][0];
      const incrementedPayload = payload.map(e => [e[0] + lastDistance, e[1]]);
      return Object.assign({}, state, {
        elevation: [...state.elevation, incrementedPayload]
      });

    case TOGGLE_FOLLOWS_ROADS:
      return Object.assign({}, state, { followsRoads: !state.followsRoads });

    case SHOW_POINT:
      return Object.assign({}, state, { showPoint: payload });

    case SET_NAME:
      return Object.assign({}, state, { name: payload });

    default:
      return state;
  }
}

export default route;
