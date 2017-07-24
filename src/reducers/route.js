import { 
  ADD_POINT,
  REMOVE_POINT,
  CLEAR_ROUTE,
  SET_MODE
} from '../actions';

const initialSettings = {
  waypoints: [],
  path: [],
  mode: 'WALK'
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

    case SET_MODE:
      return Object.assign({}, state, { mode: action.payload });

    default:
      return state;
  }
}

export default route;
