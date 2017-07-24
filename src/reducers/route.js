import { 
  ADD_POINT,
  REMOVE_POINT
} from '../actions';

const initialSettings = {
  waypoints: []
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

    default:
      return state;
  }
}

export default route;
