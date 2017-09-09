import {
  LOGIN_USER,
  LOGOUT_USER
} from '../actions';

const initialSettings = {
  uid: null,
  name: null,
  email: null,
  emailVerified: null,
  isAuthenticated: false
};

export default (state = initialSettings, { type, payload }) => {
  switch (type) {

    case LOGIN_USER:
      return Object.assign({}, state, payload, { isAuthenticated: true });

    case LOGOUT_USER:
      return Object.assign({}, state, initialSettings);

    default:
      return state;
  }
}
