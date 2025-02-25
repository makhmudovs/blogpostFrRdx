import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: (() => {
    try {
      const storedUser = localStorage.getItem("blogpostUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  })(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("blogpostUser", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    clearUser: (state) => {
      localStorage.removeItem("blogpostUser");
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
