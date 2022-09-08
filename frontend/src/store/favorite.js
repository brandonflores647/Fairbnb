import { csrfFetch } from './csrf';

export const GET_ALL_FAVORITE = 'favorite/GET_ALL_FAVORITE';
export const SET_FAVORITE = 'favorite/SET_FAVORITE';

export const getAllFavorite = (data) => ({
    type: GET_ALL_FAVORITE,
    data
});
export const setFavorite = (data) => ({
    type: SET_FAVORITE,
    data
});

// THUNKS =============================================

export const getAllFavoriteThunk = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/favorites/${userId}`);

    if (response.ok) {
      const data = await response.json();
      dispatch(getAllFavorite(data));
      return data;
    }
}

export const setFavoriteThunk = (data) => async dispatch => {
    const response = await csrfFetch(`/api/favorites/new`, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setFavorite(data));
      return data;
    }
}
