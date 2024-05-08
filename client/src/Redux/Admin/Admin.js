import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    adminDetails:null,
    error:false,
    loading:false
} 

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        adminSignInStart:(state)=>{
            state.loading= true
        },
        adminSignInSuccess:(state,action)=>{
            state.adminDetails= action.payload,
            state.loading=false,
            state.error=false
        },
        adminSignInFailure:(state,action)=>{
            state.loading=false,
            state.error= action.payload
        }
    }
})

export const {adminSignInStart,adminSignInSuccess , adminSignInFailure} = adminSlice.actions

export default adminSlice.reducer