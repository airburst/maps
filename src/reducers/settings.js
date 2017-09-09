import { REHYDRATE } from 'redux-persist/constants';
import {
  OS_SCRIPT_LOADED,
  GOOGLE_SCRIPT_LOADED,
  SET_COORDS,
  SET_ZOOM,
  TOGGLE_SHOW_ELEVATION,
  HIDE_ELEVATION,
  SHOW_MODAL,
  HIDE_MODAL,
  SET_ERROR,
  CLEAR_ERROR
} from '../actions';

const initialSettings = {
  osScriptLoaded: false,
  googleScriptLoaded: false,
  coords: {
    northing: 168721,
    easting: 385480,
    lat: null,
    lon: null
  },
  zoom: 7,
  showElevation: false,
  showDialogs: {
    import: false,
    login: false,
    save: false
  },
  error: null
};

let showDialogs;

export default (state = initialSettings, { type, payload }) => {
  switch (type) {

    case REHYDRATE:
      return Object.assign({}, state, {
        osScriptLoaded: false,
        googleScriptLoaded: false
      });

    case OS_SCRIPT_LOADED:
      return Object.assign({}, state, { osScriptLoaded: true });

    case GOOGLE_SCRIPT_LOADED:
      return Object.assign({}, state, { googleScriptLoaded: true });

    case SET_COORDS:
      return Object.assign({}, state, { coords: payload });

    case SET_ZOOM:
      return Object.assign({}, state, { zoom: payload });

    case TOGGLE_SHOW_ELEVATION:
      return Object.assign({}, state, { showElevation: !state.showElevation });

    case HIDE_ELEVATION:
      return Object.assign({}, state, { showElevation: false });

    case SHOW_MODAL:
      showDialogs = Object.assign({}, state.showDialogs, { [payload]: true });
      return Object.assign({}, state, { showDialogs });

    case HIDE_MODAL:
      showDialogs = Object.assign({}, state.showDialogs, { [payload]: false });
      return Object.assign({}, state, { showDialogs });

    case SET_ERROR:
      return Object.assign({}, state, { error: payload });

    case CLEAR_ERROR:
      return Object.assign({}, state, { error: null });

    default:
      return state;
  }
}
