import { csrfFetch } from './csrf';

export const SET_BOOKING = 'spot/SET_BOOKING';

export const setBooking = (booking) => ({
    type: SET_BOOKING,
    booking
});

// THUNKS =============================================

export const createBookingThunk = (data) => async dispatch => {
    const response = await csrfFetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const resData = await response.json();
      dispatch(setBooking(resData));
      return resData;
    }
}
