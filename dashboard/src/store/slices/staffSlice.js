import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    loading: false,
    staff: {},
    isAuthenticated: false,
    error: null,
    message: null,
  },
  reducers: {
    staffRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    staffSuccess(state, action) {
      state.loading = false;
      state.staff = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    staffFailed(state, action) {
      state.loading = false;
      state.staff = {};
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    checkInSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    checkOutSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    filterDetailsSuccess(state, action) {
      state.loading = false;
      state.filteredData = action.payload;
    },
    staffLogoutSuccess(state) {
      state.loading = false;
      state.staff = {};
      state.isAuthenticated = false;
    },
    clearStaffErrors(state) {
      state.error = null;
    }
  },
});

export const staffLogin = (data) => async (dispatch) => {
  dispatch(staffSlice.actions.staffRequest());
  try {
    const response = await axios.post("http://localhost:4000/user/login", data, {
      withCredentials: true,
    });
    dispatch(staffSlice.actions.staffSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(staffSlice.actions.staffFailed(error.response.data.message));
  }
};

export const staffLogout = () => async (dispatch) => {
  try {
    await axios.get("http://localhost:4000/user/user/logout", {
      withCredentials: true,
    });
    dispatch(staffSlice.actions.staffLogoutSuccess());
  } catch (error) {
    dispatch(staffSlice.actions.staffFailed(error.response.data.message));
  }
};

export const checkIn = (data) => async (dispatch) => {
  dispatch(staffSlice.actions.staffRequest());
  try {
    const response = await axios.post("http://localhost:4000/currentStay/checkIn", data, {
      withCredentials: true,
    });
    dispatch(staffSlice.actions.checkInSuccess(response.data));
  } catch (error) {
    dispatch(staffSlice.actions.staffFailed(error.response.data.message));
  }
};

export const checkOut = (data) => async (dispatch) => {
  dispatch(staffSlice.actions.staffRequest());
  try {
    const response = await axios.post("http://localhost:4000/currentStay/checkOut", data, {
      withCredentials: true,
    });
    dispatch(staffSlice.actions.checkOutSuccess(response.data));
  } catch (error) {
    dispatch(staffSlice.actions.staffFailed(error.response.data.message));
  }
};

export const filterDetails = (filterData) => async (dispatch) => {
  dispatch(staffSlice.actions.staffRequest());
  try {
    const response = await axios.post("http://localhost:4000/currentStay/filter", filterData, {
      withCredentials: true,
    });
    dispatch(staffSlice.actions.filterDetailsSuccess(response.data));
  } catch (error) {
    dispatch(staffSlice.actions.staffFailed(error.response.data.message));
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(staffSlice.actions.clearAllUserErrors());
};

export default staffSlice.reducer;
