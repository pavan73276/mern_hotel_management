import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
    otpSent: null,
  },
  reducers: {
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    fetchUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    logoutFailed(state, action) {
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    updatePasswordRequest(state, action) {
      state.loading = true;
    },
    updatePasswordSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
      state.user = action.payload.user;
    },
    updatePasswordFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.user = state.user;
    },

    passwordResetTokenRequest(state) {
      state.loading = true;
      state.error = null;
    },
    passwordResetTokenSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
      state.otpSent = action.payload.otp;
    },
    passwordResetTokenFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    passwordResetRequest(state) {
      state.loading = true;
      state.error = null;
    },
    passwordResetSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    passwordResetFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/user/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(error.response.data.message));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/user/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      "http://localhost:4000/user/user/me",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed(error.response.data.message));
  }
};


export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/user/user/logout",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(userSlice.actions.updatePasswordRequest());
  try {
    const response = await axios.put(
      "http://localhost:4000/user/update/password",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.updatePasswordSuccess());
  } catch (error) {
    dispatch(
      userSlice.actions.updatePasswordFailed(
        error.response.data.message || "Failed to update password."
      )
    );
  }
};

export const getPasswordResetToken = (email) => async (dispatch) => {
  const toastId = toast.loading("Sending reset email...");

  dispatch(userSlice.actions.passwordResetTokenRequest());

  try {
    const response = await axios.post(
      "http://localhost:4000/user/sendotp",
      { email },
      { headers: { "Content-Type": "application/json" } }
    );

    // Handle successful response
    dispatch(userSlice.actions.passwordResetTokenSuccess(response.data));
    toast.success("Reset email sent");
  }
   catch (error) {
    dispatch(userSlice.actions.passwordResetTokenFailed(error.response?.data?.message || "Failed to send reset email"));
    toast.error(error.response?.data?.message || "Failed to send reset email");
  } finally {
    toast.dismiss(toastId);
  }
};

export const resetPassword = (data) => async (dispatch) => {
  const toastId = toast.loading("Reset in Progress...");

  dispatch(userSlice.actions.passwordResetRequest());

  try {
    const response = await axios.put(
      "http://localhost:4000/user/resetPass",
      data,
      { headers: { "Content-Type": "application/json" } }
    );

    // Handle successful response
    dispatch(userSlice.actions.passwordResetSuccess(response.data));
    toast.success('Password changed Successfully');
  }
   catch (error) {
    dispatch(userSlice.actions.passwordResetFailed(error.response?.data?.message || "Failed to send reset email"));
    toast.error(error.response?.data?.message || "Failed to reset the password");
  } finally {
    toast.dismiss(toastId);
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;