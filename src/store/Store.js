import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../Redux/CartSlice'
const rootReducer = {
    carts: cartReducer,
}

export const store = configureStore({
    reducer: rootReducer,
  });
  