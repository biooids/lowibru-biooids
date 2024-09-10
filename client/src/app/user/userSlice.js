import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    logInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    logInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  logInStart,
  logInSuccess,
  logInFailure,
  signoutStart,
  signoutSuccess,
  signoutFailure,
} = userSlice.actions;

export default userSlice.reducer;
