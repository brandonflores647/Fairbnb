import { csrfFetch } from './csrf';

export const GET_ALL_FAVORITE = 'favorite/GET_ALL_FAVORITE';

export const getAllFavorite = (userId) => ({
    type: GET_ALL_FAVORITE,
    userId
});

// THUNKS =============================================

export const getAllFavoriteThunk = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/favorites/${userId}`);

    if (response.ok) {
      const res = await response.json();
      dispatch(getAllFavorite(res));
      return res;
    }
}
