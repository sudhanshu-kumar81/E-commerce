import { createSlice } from '@reduxjs/toolkit'
import { checkUser,createUser,signOut} from './authAPI'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUser } from '../user/userAPI.js';
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData,{ rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      console.log("response in async function is", response);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    } catch (error) {
      console.log('error in catch block is ',error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  
    // The value we return becomes the `fulfilled` action payload
    
  }
);
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo,{ rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      console.log("response in async function is", response);
      if (response.data.success) {
        return response.data;
      } else {
        console.log("in else condition");
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    } catch (error) {
      console.log('error in catch block is ',error);
      return rejectWithValue(error.data.message || { message: error.message });
    }

  }
);
export const authSlice = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: null,
    status: 'idle',
    signupStatus:'',
    LoginStatus:'',
    error:null,
    token:null
  },
  reducers: {

  },
  extraReducers:(builder)=>{
    builder
    .addCase(createUserAsync.pending, (state) => {
      state.status="loading";
      state.signupStatus="pending";
    })
    .addCase(createUserAsync.fulfilled, (state,action) => {
      state.status = 'idle';
      state.loggedInUser = action.payload.user;
      state.signupStatus="fulfilled";
      state.error=null
    })
    .addCase(createUserAsync.rejected, (state,action) => {
      state.status = 'idle';
      state.signupStatus="rejected";
      state.error=action.payload
    })
    .addCase(checkUserAsync.pending, (state) => {
      state.status = 'loading';
      state.LoginStatus="pending";
    })
    .addCase(checkUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUser = action.payload.user;
      state.LoginStatus="fulfilled";
      state.token=action.payload.token;
      state.error=null
    })
    .addCase(checkUserAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.LoginStatus="rejected";
      state.error = action.payload;
    })
    .addCase(signOutAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(signOutAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUser = null;
    })

  },
})
export const selectLoggedInUser = (state)=>state.auth.loggedInUser;
export const selectError = (state)=>state.auth.error;
 export const selectauthStatus=(state)=>state.auth.status;
export const selectAuthToken = (state)=>state.auth.token;
export const selectSignupStatus=(state)=>state.auth.signupStatus;


export default authSlice.reducer
