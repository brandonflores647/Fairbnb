import { csrfFetch } from './csrf';

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const GET_USER_DETAIL = 'session/GET_USER_DETAIL';

const setUser = (user) => ({
  type: SET_USER,
  user
});

const removeUser = () => ({
  type: REMOVE_USER
});

const loadUserDetail = (user) => ({
  type: GET_USER_DETAIL,
  user
})

// THUNKS =============================================

export const login = (user) => async dispatch => {
    const { credential, password } = user;

    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password
      })
    });

    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}
export const signup = (user) => async dispatch => {
    const { username, email, password } = user;

    const response = await csrfFetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password
      })
    });

    const data = await response.json();
    dispatch(setUser(data.user, {}, {}));
    return response;
}
export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
}
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}
export const getUserDetail = (id) => async dispatch => {
    const response = await csrfFetch(`/api/users/${id}`);

    if (response.ok) {
      const data = await response.json();
      dispatch(loadUserDetail(data));
      return data;
    }
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
