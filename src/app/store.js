import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "../features/blogSlice";
import notificationReducer from "../features/notificationSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
    user: userReducer,
  }
});

