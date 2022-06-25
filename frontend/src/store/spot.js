import { csrfFetch } from './csrf';

const SET_SPOT = 'spot/SET_SPOT';
const LOAD_SPOT = 'spot/LOAD_SPOT';

const setSpot = (spot, imgArr) => ({
    type: SET_SPOT,
    spot,
    imgArr
});

const loadSpot = (spot) => ({
    type: LOAD_SPOT,
    spot,
});

// THUNKS =============================================

export const create = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      body: JSON.stringify(spot)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setSpot(data.spot, data.imgArr));
      return response;
    }
}

export const getSpotDetail = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
      const spot = await response.json();
      console.log(spot)
      dispatch(loadSpot(spot));
      return response;
    }
}

const initialState = { };

const spotReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_SPOT:
        newState = { ...state }
        const imgObj = {};
        action.imgArr.forEach(img => {
          imgObj[img.id] = {
            url: img.url
          }
        });

        newState[action.spot.id] = {
          data: {
              userId: action.spot.userId,
              price: action.spot.price,
              name: action.spot.name,
              address: action.spot.address,
              city: action.spot.city,
              state: action.spot.state,
              country: action.spot.country
          },
          reviews: {},
          images: imgObj,
        }

        return newState;
    case LOAD_SPOT:
        return { ...action.spot };
    default:
      return state;
  }
};

export default spotReducer;
