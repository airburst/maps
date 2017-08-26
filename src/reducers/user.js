import {
    SET_TOKEN,
    CLEAR_TOKEN
} from '../actions';

const initialSettings = {
    authenticated: false,
    token: null
};

export default (state = initialSettings, { type, payload }) => {
    switch (type) {

        case SET_TOKEN:
            return Object.assign({}, state, {
                authenticated: true,
                token: payload
            });

        case CLEAR_TOKEN:
            return Object.assign({}, state, {
                authenticated: false,
                token: null
            });

        default:
            return state;
    }
}
