import { csrfFetch } from './csrf';

export const GET_ALL_FAVORITE = 'favorite/GET_ALL_FAVORITE';

export const getAllFavorite = (data) => ({
    type: GET_ALL_FAVORITE,
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
