import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminDetails: null,
  error: false,
  loading: false,
  count:0
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminSignInStart: (state) => {
      state.loading = true;
    },
    adminSignInSuccess: (state, action) => {
      (state.adminDetails = action.payload),
        (state.loading = false),
        (state.error = false);
    },
    adminSignInFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    adminSignOutSuccess: (state) => {
      (state.loading = false), (state.adminDetails = null);
      state.error = null;
    },
   
  },
});

export const {
  adminSignInStart,
  adminSignInSuccess,
  adminSignInFailure,
  adminSignOutSuccess,
  increment,decrement
} = adminSlice.actions;

export default adminSlice.reducer;
