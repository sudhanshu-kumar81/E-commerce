import { createSlice } from '@reduxjs/toolkit'
import { checkUser,createUser,signOut} from './authAPI'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUser } from '../user/userAPI';
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
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo,{ rejectWithValue }) => {
    try{
      const response = await checkUser(loginInfo);
      return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }

  }
);

// try {
//   const response = await checkUser(loginInfo);
//   return response.data;
// } catch (error) {
//   console.log(error);
//   return rejectWithValue(error);
// }




// export const updateUserAsync = createAsyncThunk(
//   'user/updateUser',
//   async (update) => {
//     const response = await updateUser(update);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );
export const authSlice = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: null,
    status: 'idle',
    error:null
  },
  reducers: {

  },
  extraReducers:(builder)=>{
    builder
    .addCase(createUserAsync.pending, (state) => {
      state.status="loading";})
    .addCase(createUserAsync.fulfilled, (state,action) => {
      state.status = 'loading';
      state.loggedInUser = action.payload.user;
    })
    .addCase(checkUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(checkUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUser = action.payload.user;
      state.error=null
    })
    .addCase(checkUserAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.payload.data.message;
    })
    // .addCase(updateUserAsync.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(updateUserAsync.fulfilled, (state, action) => {
    //   state.status = 'idle';
    //   state.loggedInUser = action.payload.updatedUser;
    // })
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


export default authSlice.reducer
