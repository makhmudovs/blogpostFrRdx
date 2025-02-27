import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  blog: {}
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setBlog: (state, action) => {
      state.blog = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setBlogs,
  setBlog
} = blogSlice.actions;

export default blogSlice.reducer;