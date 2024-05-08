import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = false);
    },
    signInFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      (state.loading = false),
        (state.error = false),
        (state.currentUser = action.payload);
    },
    updateFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    deleteStart: (state) => {
      state.loading = true;
      state.error = false
    },
    deleteSuccess: (state) => {
      (state.loading = false),
        (state.error = false),
        (state.currentUser =null);
    },
    deleteFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    setErrorToNull:(state)=>{
      state.error=false
    }
  },
});

export const {
  signInStart,signInSuccess,signInFailure,
  updateStart,updateSuccess,updateFailure, 
  deleteStart,deleteSuccess,deleteFailure,
  setErrorToNull
} = userSlice.actions;

export default userSlice.reducer;
