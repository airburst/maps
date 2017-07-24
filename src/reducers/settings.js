import {
  OS_SCRIPT_LOADED,
  GOOGLE_SCRIPT_LOADED
} from '../actions';

const initialSettings = {
  osScriptLoaded: false,
  googleScriptLoaded: false
};

export default (state = initialSettings, action) => {
  switch (action.type) {

    case OS_SCRIPT_LOADED:
      return Object.assign({}, state, { osScriptLoaded: true });

    case GOOGLE_SCRIPT_LOADED:
      return Object.assign({}, state, { googleScriptLoaded: true });

    default:
      return state;
  }
}
