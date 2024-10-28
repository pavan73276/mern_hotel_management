import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "./slices/staffSlice";
import adminReducer from "./slices/adminSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
      staff: staffReducer,
      admin: adminReducer,
      user: userReducer,
  },
});

export default store;