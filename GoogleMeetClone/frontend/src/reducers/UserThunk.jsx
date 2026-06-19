import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/axiosInstance";

export let currentUser=createAsyncThunk("auth/me",async(_,thunkApi)=>{
    try {
         let res=await axiosInstance.get('/api/auth/me')
         console.log(res.data.data);
         return res.data.data
    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue(
           error.response?.data?.message || error.message
        )
    }
})