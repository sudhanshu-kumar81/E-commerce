import { createSlice } from '@reduxjs/toolkit'
import { checkUser,createUser } from './authAPI'
import { createAsyncThunk } from '@reduxjs/toolkit';
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: null,
    status: 'idle',
    error:null
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },

  },
  extraReducers:(builder)=>{
    builder
    .addCase(createUserAsync.pending, (state) => {
      state.status="loading";})
    .addCase(createUserAsync.fulfilled, (state,action) => {
      state.status = 'loading';
      state.loggedInUser = action.payload;
    })
    .addCase(checkUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(checkUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUser = action.payload;
    })
    .addCase(checkUserAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error;
    })
  },
})

export const { increment } = counterSlice.actions
export const selectLoggedInUser = (state)=>state.auth.loggedInUser;
export const selectError = (state)=>state.auth.error;


export default counterSlice.reducer
