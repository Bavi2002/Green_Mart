// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slice/productsSlice';
import cartReducer from './slice/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    carts: cartReducer
  }
});
