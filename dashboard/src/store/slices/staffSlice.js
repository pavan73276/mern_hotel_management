import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    loading: false,
    stays: {},
    error: null,
    message: null,
  },
  reducers: {
    staffRequest(state, action) {
      state.loading = true;
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
      state.stays = action.payload.stays;
      state.message = action.payload.message;
    },
    allStaysSuccess(state, action) {
      state.loading = false;
      state.stays = action.payload.stays;
      state.message = action.payload.message;
    },
    staffLogoutSuccess(state) {
      state.loading = false;
      state.staff = {};
      state.isStaffAuthenticated = false;
    },
    staffFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearStaffErrors(state) {
      state.error = null;
    }
  },
});


export const checkIn = (data) => async (dispatch) => {
  dispatch(staffSlice.actions.staffRequest());
  try {
    const response = await axios.post("http://localhost:4000/currentStay/checkIn", data, {
      withCredentials: true,
    });
    dispatch(staffSlice.actions.checkInSuccess(response.data));
    toast.success('checked in successfully');
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
    toast.success("Checkout Out Successfully");
  } catch (error) {
    dispatch(staffSlice.actions.staffFailed(error.response.data.message));
  }
};

export const filterDetails = (filterData) => async (dispatch) => {
  dispatch(staffSlice.actions.staffRequest());
  try {
    const response = await axios.post("http://localhost:4000/currentStay/filter", 
      filterData, 
      {
      withCredentials: true,
    });

    dispatch(staffSlice.actions.filterDetailsSuccess(response.data));
  } catch (error) {
    dispatch(staffSlice.actions.staffFailed(error.response.data.message));
  }
};

export const allStays = () => async (dispatch) => {
  dispatch(staffSlice.actions.staffRequest());
  try {
    const response = await axios.get("http://localhost:4000/currentStay/allstays",
      {
      withCredentials: true,
    });
    dispatch(staffSlice.actions.allStaysSuccess(response.data));
  } catch (error) {
    dispatch(staffSlice.actions.staffFailed(error.response.data.message));
  }
};

export const clearAllStaffErrors = () => (dispatch) => {
  dispatch(staffSlice.actions.clearStaffErrors());
};

export default staffSlice.reducer;
