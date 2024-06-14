import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders, updateUser, fetchLoggedInUser  } from './userAPI';
import { checkUser,createUser,signOut} from './userAPI'
import { resetPasswordRequest } from './userAPI';
import { resetPassword } from './userAPI';

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo,{ rejectWithValue }) => {
    try {
      const response = await signOut(loginInfo);
      console.log("response in async function is", response);
      if (response.data.success) {
        return response.data;
      } else {
        console.log("in else condition");
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    } catch (error) {
      console.log('error in catch block is Async ',error);
      return rejectWithValue(error.data?.message || { message: error?.message });
    }
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
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.user.id);
        return response.data;
      } else {
        console.log("in else condition");
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    } catch (error) {
      console.log('error in catch block is ',error);
      return rejectWithValue(error.data.message || { message: error.message }||{ message: error.TypeError});
    }

  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (_,{ rejectWithValue }) => {


      try {
        const response = await fetchLoggedInUser();
        console.log("response in async function fetchLoggedInUser is", response);
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

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update,{ rejectWithValue }) => {
    try {
      const response = await updateUser(update);
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

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id,{ rejectWithValue }) => {
    try {
      const response = await fetchLoggedInUserOrders(id);
      console.log("response in async function is", response);
      if (response.data.success) {
        return response.data;
      } else {
        console.log("in else condition");
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    }catch (error) {
      console.log('error in catch block is ',error);
      return rejectWithValue(error.data.message || { message: error.message });
    }
  }
);

export const resetPasswordRequestAsync = createAsyncThunk(
  'user/resetPasswordRequest',
  async (email,{rejectWithValue}) => {
    try {
      const response = await resetPasswordRequest(email);
      if(response.data.success){
        return response.data;
      }else{
        return rejectWithValue(error.data.message || { message: error.message });
      } 
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);

    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async (data,{rejectWithValue}) => {
    console.log("arrived in reset password Async data is ",data)
    try {
      const response = await resetPassword(data);
      console.log("response in reset password async is ",response);
      if(response.responseData.success){
        return response.responseData;
      }
      else{
        return rejectWithValue(response.responseData)
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);

    }
  }
);
const initialState = {
  status: '',
  message:null,
  userInfo: null,//detailed
  userOrders:[],
  LoggedInStatus:'',
  token:null,
  resetStatus:'',
  resetMessage:null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetStatusAndmessage:(state) => {
      state.status = '';
      state.message=null;
    },
    resetLoggedInStatus:(state) => {
      state.LoggedInStatus = '';
     
    },
   
   
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(createUserAsync.pending, (state) => {
      state.status="pending";
    })
    .addCase(createUserAsync.fulfilled, (state,action) => {
      state.status = 'fulfilled';
       state.message=action.payload.message;
      state.error=null;
    })
    .addCase(createUserAsync.rejected, (state,action) => {
      state.status = 'rejected';
      state.message=action?.payload||"failed to create User"
    })
    .addCase(checkUserAsync.pending, (state) => {
      state.status = 'pending';
      // state.LoginStatus='loading';
    })
    .addCase(checkUserAsync.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.userInfo = action.payload.user;
      state.message=action.payload.message;
    })
    .addCase(checkUserAsync.rejected, (state, action) => {
      state.status = 'rejected';
       state.message=action?.payload||"failed to Log in"
    })
    .addCase(signOutAsync.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(signOutAsync.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.message=action.payload.message;
      state.userInfo = null;
      state.userOrders=[];
    })
    .addCase(signOutAsync.rejected, (state) => {
      state.status = 'rejected';
       state.message=action?.payload||"failed to signout out"
    })
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.message=action.payload.message;
        state.userOrders = action.payload.userOrder;
       
      })
      .addCase(fetchLoggedInUserOrderAsync?.rejected, (state) => {
        state.status = 'rejected';
        state.message=action.payload||"failed to fetch Your orders"
        state.userOrders = []
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.message=action.payload.message;
        state.userInfo=action.payload.updatedUser
      })
      .addCase(updateUserAsync.rejected, (state,action) => {
         state.message=action?.payload||"failed to updated user"
        state.status = 'rejected';
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        // state.status = 'pending';
        state.LoggedInStatus='pending';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        // state.status = 'fulfilled';
        // state.message=action.payload.message;
        state.LoggedInStatus='fulfilled';
        state.userInfo = action.payload.user;
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state,action) => {
        // state.status = 'rejected';
        state.LoggedInStatus='rejected';
        //  state.message=action?.payload||"failed to fetch User"
        state.userInfo = null;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.message=action.payload.message;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.message=action?.payload.data.message||"failed to sent email";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.resetStatus = 'fulfilled';
        state.resetMessage=action.payload.message;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.resetStatus = 'rejected';
        state.resetMessage=action?.payload?.message||"reset password failed";
      })
      .addCase(resetPasswordAsync.pending,(state, action) => {
        state.resetStatus = 'rejected';
      })
     

  },
});

export const selectUserOrders = (state)=>state.user.userOrders;
export const selectUserStatus=(state)=>state.user.status;
export const selectLoggedInStatus=(state)=>state.user.LoggedInStatus;
export const selectUserMessage=(state)=>state.user.message;
export const selectUserResetStatus=(state)=>state.user.resetStatus;
export const selectUserResetMessage=(state)=>state.user.resetMessage;
export const selectUserInfo = (state)=>state.user.userInfo;
export const {resetStatusAndmessage,resetLoggedInStatus} = userSlice.actions;
export default userSlice.reducer;

