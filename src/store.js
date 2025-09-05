//store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Create the Redux store and register reducers
const store = configureStore({
  reducer: {
    cart: cartReducer, // 'cart' slice handled by CartSlice
  },
});

export default store; // used by <Provider store={store}>
