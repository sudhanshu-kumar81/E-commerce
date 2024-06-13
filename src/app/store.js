// import { configureStore } from '@reduxjs/toolkit'
// // import counterReducer from '../features/counter/counterSlice'
// import productListReducer from '../features/product-list/productlistSlice';
// import cartReducer from '../features/cart/counterSlice';
// import orderReducer from '../features/order/orderSlice';
// import userReducer from '../features/user/userSlice';
// export const store = configureStore({
//   reducer: {
//     //  counter:counterReducer,
//     product: productListReducer,
//     cart: cartReducer,
//     order: orderReducer,
//     user: userReducer,

//   },
// })


// reducers/rootReducer.js

import { combineReducers } from '@reduxjs/toolkit';
import productListReducer from '../features/product-list/productlistSlice';
import cartReducer from '../features/cart/counterSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';
import { RESET_STATE } from './constants';
import { configureStore } from '@reduxjs/toolkit';

const appReducer = combineReducers({
  product: productListReducer,
  cart: cartReducer,
  order: orderReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined; // Set state to undefined to reset all slices to their initial state
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});







