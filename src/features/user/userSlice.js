import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  token: "",
  role: "",
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestSignUp(state, action) {
      state.loading = true;
    },

    requestSignIn(state, action) {
      state.loading = true;
    },

    responseSignIn(state, action) {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
