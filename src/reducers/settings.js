import {
  OS_SCRIPT_LOADED,
  GOOGLE_SCRIPT_LOADED,
  SET_COORDS,
  SET_ZOOM,
  TOGGLE_SHOW_ELEVATION
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
  showElevation: true
};

export default (state = initialSettings, { type, payload }) => {
  switch (type) {

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

    default:
      return state;
  }
}
