import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialValue,
  reducers: {
    addProduct: (state, action) => {
      const exists = state.products.find((x) => x._id === action.payload._id);
      if (exists) {
        state.products = state.products.map((x) =>
          x._id === action.payload._id
            ? {
                ...x,
                quantity: x.quantity + 1,
                price: action.payload.price * (x.quantity + 1),
              }
            : x
        );
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    removeProduct: (state, action) => {
      const exists = state.products.find((x) => x._id === action.payload._id);
      if (exists) {
        state.products = state.products.map((x) =>
          x._id === action.payload._id
            ? {
                ...x,
                quantity: x.quantity - 1,
                price: action.payload.price * (x.quantity - 1),
              }
            : x
        );
        state.total -= action.payload.price * action.payload.quantity;
      }
    },
    deleteProduct: (state, action) => {
      const exists = state.products.findIndex((x) => x._id === action.payload._id);
      state.products.splice(exists,1)
      state.quantity -= 1;
      state.total -= action.payload.price;
    },
  },
});

const { actions, reducer } = cartSlice;
export const { addProduct,removeProduct, deleteProduct} = actions;
export default reducer;
