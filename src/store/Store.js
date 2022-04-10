import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../Redux/CartSlice'
import userReducer from '../Redux/UserSlice'
const rootReducer = {
    carts: cartReducer,
    users: userReducer
}

export const store = configureStore({
    reducer: rootReducer,
  });
   