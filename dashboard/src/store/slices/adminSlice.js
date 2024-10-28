import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    admin: {},
    staffs: {},
    allrooms: {},
    bookings: {},
    error: null,
    message: null,
  },
  reducers: {
    adminRequest(state, action) {
      state.loading = true;
    },
    addNewAdminRequest(state, action) {
      state.loading = true;
    },
    addNewAdminSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    addNewAdminFailed(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    addNewStaffRequest(state, action) {
      state.loading = true;
    },
    addNewStaffSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    addNewStaffFailed(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    getAllStaffSuccess(state, action) {
      state.loading = false;
      state.staffs = action.payload.staffs;
    },
    allRoomsRequest(state, action) {
      state.loading = true;
    },
    allRoomsSuccess(state, action) {
      state.loading = false;
      state.allrooms = action.payload.rooms;
      state.error = null;
    },
    allRoomsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addNewRoomRequest(state, action) {
      state.loading = true;
    },
    addNewRoomSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    addNewRoomFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getAllBookingsSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.bookings = action.payload.bookings; 
    },
    adminFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAdminErrors(state) {
      state.error = null;
    }
  },
});

export const addNewAdmin = (data) => async (dispatch) => {
  dispatch(adminSlice.actions.addNewAdminRequest());
  try {
    const response = await axios.post("http://localhost:4000/user/admin/addnew", data, {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.addNewAdminSuccess(response.data));
    toast.success('New Admin Added');
  } catch (error) {
    console.log(error)
    dispatch(adminSlice.actions.addNewAdminFailed(error.response.data.message));
  }
};

export const addNewStaff = (data) => async (dispatch) => {
  dispatch(adminSlice.actions.addNewStaffRequest());
  try {
    const response = await axios.post("http://localhost:4000/user/staff/addnew", data, {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.addNewStaffSuccess(response.data));
    toast.success('New Staff Added');
  } catch (error) {
    dispatch(adminSlice.actions.addNewStaffFailed(error.response.data.message));
  }
};

export const AllRooms = () => async (dispatch) => {
  dispatch(adminSlice.actions.allRoomsRequest());
  try {
    const response = await axios.get("http://localhost:4000/room/getallrooms",
    {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.allRoomsSuccess(response.data));
  } catch (error) {
    dispatch(adminSlice.actions.allRoomsFailed(error.response.data.message));
  }
};

export const getAllStaff = () => async (dispatch) => {
  dispatch(adminSlice.actions.adminRequest());
  try {
    const response = await axios.get("http://localhost:4000/user/staff", {
      withCredentials: true,
    });
    
    dispatch(adminSlice.actions.getAllStaffSuccess(response.data));
  } catch (error) {
    dispatch(adminSlice.actions.adminFailed(error.response.data.message));
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch(adminSlice.actions.adminRequest());
  try {
    const response = await axios.get("http://localhost:4000/booking/getAllBookings", {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.getAllBookingsSuccess(response.data));
  } catch (error) {
    dispatch(adminSlice.actions.adminFailed(error.response.data.message));
  }
};
export const addNewRoom = (data) => async (dispatch) => {
  dispatch(adminSlice.actions.addNewRoomRequest());
  try {
    const response = await axios.post("http://localhost:4000/room/addRoom", data, {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.addNewRoomSuccess(response.data));
    toast.success('New room Added Suucessfully.');
  } catch (error) {
    dispatch(adminSlice.actions.addNewRoomFailed(error.response.data.message));
  }
};

export const DeleteRoom = (data) => async (dispatch) => {
  dispatch(adminSlice.actions.addNewRoomRequest());
  try {
    const response = await axios.post("http://localhost:4000/room/deleteRoom", data, {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.addNewRoomSuccess(response.data));
    toast.success('Room Deleted Sucessfully.');
  } catch (error) {
    dispatch(adminSlice.actions.addNewRoomFailed(error.response.data.message));
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(adminSlice.actions.clearAllUserErrors());
};

export default adminSlice.reducer;
