import { createSlice } from "@reduxjs/toolkit";
import {
  amountDecrement,
  amountIncrement,
  fetchProducts,
} from "../api/productsApi";
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    totalPages: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.totalPages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(amountIncrement.fulfilled, (state, { payload }) => {
        const product = state.products.find((prod) => prod.id === payload.id);
        product.amount = payload.amount;
      })
      .addCase(amountDecrement.fulfilled, (state, { payload }) => {
        const product = state.products.find((prod) => prod.id === payload.id);
        product.amount = payload.amount;
      });
  },
});

export const { increment, decrement } = productSlice.actions;
export default productSlice.reducer;
