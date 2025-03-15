import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../mock";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [...products],
  },
  reducers: {
    increment(state, { payload }) {
      const prod = state.products.find((product) => product.id === payload.id);
      prod.amount += 1;
    },
    decrement(state, { payload }) {
      const prod = state.products.find((product) => product.id === payload.id);
      if (prod.amount > 1) prod.amount -= 1;
    },
  },
});

export const { increment, decrement } = productSlice.actions;
export default productSlice.reducer;
