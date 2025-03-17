import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  clearCart,
  fetchCart,
  removeFromCart,
} from "../api/cartApi";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartElems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartElems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existing = state.cartElems.find(
          (item) => item.id === action.payload.id
        );
        if (existing) {
          existing.amount = action.payload.amount;
        } else state.cartElems.push(action.payload);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartElems = state.cartElems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cartElems = action.payload;
      });
  },
});

export default cartSlice.reducer;
