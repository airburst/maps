import { ADD_POINT } from '../actions';

const initialSettings = {
  waypoints: []
};

const route = (state = initialSettings, action) => {
  switch (action.type) {

    case ADD_POINT:
      return Object.assign({}, state, { 
        waypoints: [...state.waypoints].concat(action.payload)
      });

    default:
      return state;
  }
}

export default route;
