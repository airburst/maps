export const SET_TOKEN = 'SET_TOKEN';
export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token
  };
}

export const CLEAR_TOKEN = 'CLEAR_TOKEN';
export const clearToken = () => {
  return {
    type: CLEAR_TOKEN
  };
}
