import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import productListReducer from '../features/product-list/productlistSlice';
import cartReducer from '../features/cart/counterSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';
export const store = configureStore({
  reducer: {
    //  counter:counterReducer,
    product: productListReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,

  },
})