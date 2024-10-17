import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    allAvailability: [],
    currentBookings: [],
    allMyBookings: [],
    isAvailable: 0,
    error: null,
    message: null,
  },
  reducers: {
    allAvailabilityRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    allAvailabilitySuccess(state, action) {
      state.loading = false;
      state.allAvailability = action.payload.avails;
      state.error = null;
      state.message = action.payload.message;
    },
    allAvailabilityFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    availabilityRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    availabilitySuccess(state, action) {
      state.loading = false;
      state.isAvailable = action.payload.count;
      state.error = null;
    },
    availabilityFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    currentBookingsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    currentBookingsSuccess(state, action) {
      state.loading = false;
      state.currentBookings = action.payload.currentBookings;
      state.error = null;
    },
    currentBookingsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    allMyBookingsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    allMyBookingsSuccess(state, action) {
      state.loading = false;
      state.allMyBookings = action.payload.bookings;
      state.error = null;
    },
    allMyBookingsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state, action) {
      state.error = null;
    },
  },
});

export const getAvailbility = (data) => async (dispatch) => {
  dispatch(bookingSlice.actions.availabilityRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/room/checkAvail",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response)
    dispatch(bookingSlice.actions.availabilitySuccess(response.data));
    dispatch(bookingSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      bookingSlice.actions.availabilityFailed(error.response.data.message)
    );
  }
};

export const showMyAllBookings = () => async (dispatch) => {
  dispatch(bookingSlice.actions.allMyBookingsRequest());
  try {
    const response = await axios.get(
      "http://localhost:4000/booking/getMyBookings",
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(bookingSlice.actions.allMyBookingsSuccess(response.data));
    dispatch(bookingSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      bookingSlice.actions.allMyBookingsFailed(error.response.data.message)
    );
  }
};

export const getCurrentBookings = () => async (dispatch) => {
  dispatch(bookingSlice.actions.currentBookingsRequest());
  try {
    const response = await axios.get(
      "http://localhost:4000/booking/currentBookings",
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(bookingSlice.actions.currentBookingsSuccess(response.data));
    dispatch(bookingSlice.actions.clearAllErrors());
  } catch (error) {
    
    console.log(error);
    dispatch(
      bookingSlice.actions.currentBookingsFailed(error.response.data.message)
    );
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(bookingSlice.actions.clearAllErrors());
};

export default bookingSlice.reducer;
