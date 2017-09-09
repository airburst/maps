import Auth from '../services/Firebase/Auth';
const auth = new Auth();

export const LOGIN_USER = 'LOGIN_USER';
export const loginUser = user => {
    return {
        type: LOGIN_USER,
        payload: user
    };
}

export const login = (email, password) => dispatch => {
    return new Promise((resolve, reject) => {
        auth.login(email, password)
            .then(user => {
                dispatch(loginUser(user));
                resolve();
            })
            .catch(err => reject(err));
    });
}

export const LOGOUT_USER = 'LOGOUT_USER';
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT_USER });
}

// signUp

// forgotPassword / resetPassword
