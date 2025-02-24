import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBlogs } = blogSlice.actions;

export default blogSlice.reducer;
