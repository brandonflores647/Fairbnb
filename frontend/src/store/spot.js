import { csrfFetch } from './csrf';

const SET_SPOT = 'spot/SET_SPOT';

const setSpot = spot => ({
    type: SET_SPOT,
    spot
});

// THUNKS =============================================

export const create = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      body: JSON.stringify(spot)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setSpot(data.spot));
        return response;
    }
}

const initialState = { };

const spotReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_SPOT:
      newState = { ...state }
      newState[action.spot.id] = {
        data: {},
        reviews: {},
        images: {},
      }
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
