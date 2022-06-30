import { csrfFetch } from './csrf';

export const SET_BOOKING = 'spot/SET_BOOKING';
export const EDIT_BOOKING = 'session/EDIT_BOOKING';

export const setBooking = (booking) => ({
    type: SET_BOOKING,
    booking
});

export const editBooking = (booking) => ({
    type: EDIT_BOOKING,
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

export const editBookingThunk = (data) => async dispatch => {
    const response = await csrfFetch('/api/bookings', {
      method: 'PATCH',
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const resData = await response.json();
      dispatch(editBooking(resData));
      return resData;
    }
}
