import { csrfFetch } from './csrf';

export const SET_REVIEW = 'spot/SET_REVIEW';

export const setReview = (title, description) => ({
    type: SET_REVIEW,
    title,
    description
});

// THUNKS =============================================

export const createReviewThunk = (data) => async dispatch => {
    const response = await csrfFetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const resData = await response.json();
      dispatch(setReview(resData.title, resData.description));
      return resData;
    }
}
