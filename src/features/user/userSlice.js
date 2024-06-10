import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders, updateUser, fetchLoggedInUser  } from './userAPI';
import { checkUser,createUser,signOut} from './userAPI'
const initialState = {
  status: 'idle',
  userInfo: null,//detailed
  userOrders:[],
  token:null,
  loginError:null,
  signUpError:null,
  signupStatus:'',
  LoginStatus:'idle',
};
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
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    resetSignUpStatus: (state) => {
      state.signupStatus = '';
    }
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(createUserAsync.pending, (state) => {
      state.status="loading";
      state.signupStatus="pending";
    })
    .addCase(createUserAsync.fulfilled, (state,action) => {
      state.status = 'idle';
      // state.userInfo = action.payload.user;
      state.signupStatus="fulfilled";
      state.signUpError=null
    })
    .addCase(createUserAsync.rejected, (state,action) => {
      state.status = 'idle';
      state.signupStatus="rejected";
      state.signUpError=action.payload
    })
    .addCase(checkUserAsync.pending, (state) => {
      state.status = 'loading';
      state.LoginStatus='loading';
    })
    .addCase(checkUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.userInfo = action.payload.user;
      state.LoginStatus="idle";
      state.loginError=null
    })
    .addCase(checkUserAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.LoginStatus="idle";
      state.loginError = action.payload;
    })
    .addCase(signOutAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(signOutAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.userInfo = null;
      state.userOrders=[];
    })
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from logged-in User info
        state.userOrders = action.payload.userOrder;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo=action.payload.updatedUser
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
        state.UserLoggedInstatus='pending';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from logged-in User info
        state.userInfo = action.payload.user;
        state.UserLoggedInstatus='fulfilled';
      });

  },
});

export const selectUserOrders = (state)=>state.user.userOrders;
export const selectUserStatus=(state)=>state.user.status;
export const selectUserInfo = (state)=>state.user.userInfo;
export const selectUserLoggedInstatus = (state)=>state.user.UserLoggedInstatus;
export const selectLoginError = (state)=>state.user.loginError;
export const selectSignUpError = (state)=>state.user.signUpError;
 export const selectauthStatus=(state)=>state.user.status;
export const selectSignupStatus=(state)=>state.user.signupStatus;
export const selectLoginStatus=(state)=>state.user.LoginStatus;

export const { increment,resetSignUpStatus } = userSlice.actions;
export default userSlice.reducer;
// //loginError:null,
// signUpError:null,