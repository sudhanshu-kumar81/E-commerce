
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchItemsByUserId, updateCart,resetCart } from './cartAPI';
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
    async (item,{ rejectWithValue }) => {
      try {
        console.log("item in addTocart in frontend",item);
        const response = await addToCart(item);
        console.log("response in async function is", response);
        if (response.data.success) {
          return response.data;
        } else {
          return rejectWithValue(response.data.message); // Pass only the data property
        }
      }catch (error) {
        console.log('error in catch block is ',error);
        return rejectWithValue(error.response?.data || { message: error.message });
      }



  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
    async (_,{ rejectWithValue }) => {
      try {
        const response = await fetchItemsByUserId();
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



  }
);


export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (updatedItem,{ rejectWithValue }) => {
    try {
      const response = await updateCart(updatedItem);
      console.log("response in async function is", response);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
  }catch (error) {
    console.log('error in catch block is ',error);
    return rejectWithValue(error.response?.data || { message: error.message });
  }
}

);

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId ,{ rejectWithValue }) => {
    try {
      const response = await deleteItemFromCart(itemId);
      console.log("response in async function is", response);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
  }catch (error) {
    console.log('error in catch block is ',error);
    return rejectWithValue(error.response?.data || { message: error.message });
  }

  }
);
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId,{ rejectWithValue }) => {
    try {
      const response = await resetCart(userId);
      console.log("response in async function is", response);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
  } catch (error) {
    console.log('error in catch block is ',error);
    return rejectWithValue(error.response?.data || { message: error?.message });
  } 
  }
);
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: 0,
  status: '',
  fetchStatus:'',
  error:null,
  items: [],
  },
  reducers: {
    resetCartTemp: (state) => {
        state.items = [];
      },
      resetCartStatusandError:(state) => {
        state.status = '';
        state.error=null;
      }
     
    
  },
  extraReducers:(builder)=>{
    builder
    .addCase(addToCartAsync.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(addToCartAsync.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.items.push(action.payload.cartDetails);
      state.error=action.payload.message
    })
    .addCase(addToCartAsync.rejected, (state, action) => {
      state.status = 'rejected';
      state.error=action?.payload||"failed to add "
    })
    .addCase(fetchItemsByUserIdAsync.pending, (state) => {
      state.fetchStatus = 'pending';
    })
    .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
      state.fetchStatus = 'fulfilled';
      state.items = action.payload.cartItems;
    })
    .addCase(fetchItemsByUserIdAsync.rejected, (state,action) => {
      state.fetchStatus = 'rejected';
      state.items = [];
      state.error=action?.payload||"failed to fetch Item"
    })
    .addCase(updateCartAsync.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(updateCartAsync.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      const index =  state.items.findIndex(item=>item.id===action.payload.updatedItem.id)
      state.items[index] = action.payload.updatedItem;
      state.error=action.payload.message
    })
    .addCase(updateCartAsync.rejected, (state,action) => {
      state.status = 'rejected';
      state.error=action?.payload||"failed to update"
    })
    .addCase(deleteItemFromCartAsync.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      const index =  state.items.findIndex(item=>item.id===action.payload.deletedItem.id)
      state.items.splice(index,1);
      state.error=action.payload.message
    })
    .addCase(deleteItemFromCartAsync.rejected, (state,action) => {
      state.status = 'rejected';
     state.error=action?.payload||"failed to delete "
    })
    .addCase(resetCartAsync.pending, (state) => {
      state.resetStatus = 'pending';
    })
    .addCase(resetCartAsync.fulfilled, (state, action) => {
      state.resetStatus = 'fulfilled';
      state.error=action.payload.message;
      state.items = [];
    })
    .addCase(resetCartAsync.rejected, (state, action) => {
      state.resetStatus = 'rejected';
      state.error=action?.payload||"reset "
    })
},
});

export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;
export const selectCartFetchStatus = (state) => state.cart.fetchStatus;


export const { resetCartTemp,resetCartStatusandError } = cartSlice.actions;//
export default cartSlice.reducer