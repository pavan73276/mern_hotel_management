import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    admin: {},
    staff: {},
    isAuthenticated: false,
    error: null,
    message: null,
  },
  reducers: {
    adminRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    adminSuccess(state, action) {
      state.loading = false;
      state.admin = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.message = action.payload.message;
    },
    adminFailed(state, action) {
      state.loading = false;
      state.admin = {};
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    addNewStaffSuccess(state, action) {
      state.loading = false;
      state.staff.push(action.payload);
      state.message = action.payload.message;
    },
    getAllStaffSuccess(state, action) {
      state.loading = false;
      state.staff = action.payload;
    },
    getUserDetailsSuccess(state, action) {
      state.loading = false;
      state.admin = action.payload;
    },
    adminLogoutSuccess(state) {
      state.loading = false;
      state.admin = {};
      state.isAuthenticated = false;
    },
    adminFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addNewRoomSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    clearAdminErrors(state) {
      state.error = null;
    }
  },
});

export const addNewAdmin = (data) => async (dispatch) => {
  dispatch(adminSlice.actions.adminRequest());
  try {
    const response = await axios.post("http://localhost:4000/user/admin/addnew", data, {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.adminSuccess(response.data));
  } catch (error) {
    dispatch(adminSlice.actions.adminFailed(error.response.data.message));
  }
};

export const loginAdmin = (data) => async (dispatch) => {
  dispatch(adminSlice.actions.adminRequest());
  try {
    const response = await axios.post("http://localhost:4000/user/login", data, {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.adminSuccess(response.data));
  } catch (error) {
    dispatch(adminSlice.actions.adminFailed(error.response.data.message));
  }
};

export const addNewStaff = (data) => async (dispatch) => {
  dispatch(adminSlice.actions.adminRequest());
  try {
    const response = await axios.post("http://localhost:4000/user/staff/addnew", data, {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.addNewStaffSuccess(response.data));
  } catch (error) {
    dispatch(adminSlice.actions.adminFailed(error.response.data.message));
  }
};

export const getAllStaff = () => async (dispatch) => {
  dispatch(adminSlice.actions.adminRequest());
  try {
    const response = await axios.get("http://localhost:4000/user/staff", {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.getAllStaffSuccess(response.data.staff));
  } catch (error) {
    dispatch(adminSlice.actions.adminFailed(error.response.data.message));
  }
};

export const getUserDetails = () => async (dispatch) => {
  dispatch(adminSlice.actions.adminRequest());
  try {
    const response = await axios.get("http://localhost:4000/user/admin/me", {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.getUserDetailsSuccess(response.data.admin));
  } catch (error) {
    dispatch(adminSlice.actions.adminFailed(error.response.data.message));
  }
};

export const adminLogout = () => async (dispatch) => {
  try {
    await axios.get("http://localhost:4000/user/user/logout", {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.adminLogoutSuccess());
  } catch (error) {
    dispatch(adminSlice.actions.adminFailed(error.response.data.message));
  }
};

export const addNewRoom = (data) => async (dispatch) => {
  dispatch(adminSlice.actions.adminRequest());
  try {
    const response = await axios.post("http://localhost:4000/room/addRoom", data, {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.addNewRoomSuccess(response.data));
  } catch (error) {
    dispatch(adminSlice.actions.adminFailed(error.response.data.message));
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(adminSlice.actions.clearAllUserErrors());
};

export default adminSlice.reducer;
