import { csrfFetch } from './csrf';

const SET_SPOT = 'spot/SET_SPOT';
const LOAD_SPOT = 'spot/LOAD_SPOT';

const setSpot = (spot, imgArr) => ({
    type: SET_SPOT,
    spot,
    imgArr
});

const loadSpot = (spot, images, reviews) => ({
    type: LOAD_SPOT,
    spot,
    images,
    reviews
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
      return data;
    }
}

export const getSpotDetail = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
      const data = await response.json();
      dispatch(loadSpot(data.spot, data.images, data.reviews));
      return data;
    }
}

const initialState = { };

const spotReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_SPOT: {
      newState = { ...state }
      const imgObj = {};
      action.imgArr.forEach(img => {
        imgObj[img.id] = {
          url: img.url
        }
      });

      newState.id = action.spot.id;
      newState.data = {
          userId: action.spot.userId,
          price: action.spot.price,
          name: action.spot.name,
          address: action.spot.address,
          city: action.spot.city,
          state: action.spot.state,
          country: action.spot.country
      };
      newState.images = imgObj;
      return newState;
    }
    case LOAD_SPOT: {
      const imgObj = {};
      action.images.forEach(img => {
        imgObj[img.id] = {
          url: img.url
        }
      });
      const reviewObj = {};
      action.reviews.forEach(review => {
        reviewObj[review.id] = {
          description: review.description,
          rating: review.rating
        }
      });
      return {
        data: {
          ...action.spot
        },
        images: imgObj,
        reviews: reviewObj,
      };
    }
    default:
      return state;
  }
};

export default spotReducer;
