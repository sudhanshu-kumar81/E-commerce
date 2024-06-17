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
      return rejectWithValue(error.data.message || { message: error.message });
    }
  }
  
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort, pagination},{ rejectWithValue }) => {
    try {
    const response = await fetchAllOrders(sort,pagination);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    }catch (error) {
      return rejectWithValue(error.data.message || { message: error.message });
    }
  }
);

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order,{ rejectWithValue }) => {
    try {
      const response = await createOrder(order);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message); // Pass only the data property
      }
    }catch (error) {
      return rejectWithValue(error.data.message || { message: error.message });
    }
  }
);
const initialState = {
  orders: [],
  status: 'idle',
  message:null,
  currentOrder:null,
  fetchOrderStatus:'',
  totalOrders: 0
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
    resetOrderStatusAndMessage: (state) => {
      state.status = '';
      state.message=null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createOrderAsync.rejected, (state,action) => {
        state.status = 'rejected';
        state.message=action.payload||"failed to create order"
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.orders.push(action.payload.order);
        state.currentOrder = action.payload.order;
        state.message=action.payload.message;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.fetchOrderStatus = 'pending';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.fetchOrderStatus = 'fulfilled';
        state.orders = action.payload.orders
        state.totalOrders=action.payload.totalDocs
      })
      .addCase(fetchAllOrdersAsync.rejected, (state) => {
        state.fetchOrderStatus = 'rejected';
        state.orders = []
        state.totalOrders=0
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'pending';
        
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const index =  state.orders.findIndex(order=>order.id===action.payload.updatedOrders.id)
        state.orders[index] = action.payload.updatedOrders;
      })
      .addCase(updateOrderAsync.rejected, (state) => {
        state.status = 'rejected';
      })
  },
});

export const { increment, resetOrder,resetOrderStatusAndMessage } = orderSlice.actions;///resetOrderStatusAndMessage
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectAllOrdersForAdmin = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectStatusForOrder=(state)=>state.order.status;
export const selectMessageForOrder=(state)=>state.order.message;
export const selectFetchOrderStatus=(state)=>state.order.fetchOrderStatus;
export default orderSlice.reducer;