import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "./slices/staffSlice";
import adminReducer from "./slices/adminSlice";

const store = configureStore({
  reducer: {
      staff: staffReducer,
      admin: adminReducer
  },
});

export default store;