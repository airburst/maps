import { ADD_POINT } from '../actions/route';

const route = (state = [], action) => {
  switch (action.type) {

    case ADD_POINT:
      return action.payload;

    default:
      return state;
  }
}

export default route;
