import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders,updateOrder  } from './orderAPI';


export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order,{ rejectWithValue }) => {
    try {
      const response = await updateOrder(order);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    }catch (error) {
      console.log('error in catch block is ',error);
      return rejectWithValue(error.data.message || { message: error.message });
    }
  }
  
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort, pagination},{ rejectWithValue }) => {
    try {
      console.log("fetchAllOrdersAsync sort and pagination",sort,pagination)
    const response = await fetchAllOrders(sort,pagination);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    }catch (error) {
      console.log('error in catch block is ',error);
      return rejectWithValue(error.data.message || { message: error.message });
    }
  }
);

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order,{ rejectWithValue }) => {
    try {
      console.log("in the begining of createOrderAsync",order);
      const response = await createOrder(order);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    }catch (error) {
      console.log('error in catch block is ',error);
      return rejectWithValue(error.data.message || { message: error.message });
    }
  }
);
const initialState = {
  orders: [],
  status: 'idle',
  message:null,
  currentOrder:null,
  totalOrders: 0
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload.order);
        state.currentOrder = action.payload.order;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders
        state.totalOrders=action.payload.totalDocs
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.orders.findIndex(order=>order.id===action.payload.updatedOrders.id)
        state.orders[index] = action.payload.updatedOrders;
      })
  },
});

export const { increment, resetOrder } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectAllOrdersForAdmin = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectStatusForOrder=(state)=>state.order.status;
export default orderSlice.reducer;