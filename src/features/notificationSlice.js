import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: {
    message: "",
    type: "info",
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    clearNotification: (state) => {
      state.notification = {
        message: "",
        type: "info",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
