import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
const store = configureStore({
  reducer: {
    todo: todoSlice,
    cart: cartSlice,
    products: productSlice,
  },
});

export default store;
