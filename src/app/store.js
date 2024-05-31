import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import productListReducer from '../features/product-list/productlistSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/counterSlice';
import orderReducer from '../features/order/orderSlice';
export const store = configureStore({
  reducer: {
  //  counter:counterReducer,
   product:productListReducer,
   auth: authReducer,
  cart: cartReducer,
  order: orderReducer
   
  },
})