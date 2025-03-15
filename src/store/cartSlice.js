import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../mock";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartElems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
  reducers: {
    addToCart(state, { payload }) {
      const elem = products.find((product) => product.id === payload.id);
      const inCart = state.cartElems.find((prod) => prod.id === elem.id);
      if (inCart) inCart.amount = payload.count;
      else
        state.cartElems.push({
          ...elem,
          amount: payload.count,
        });
      localStorage.setItem("cart", JSON.stringify(state.cartElems));
    },
    removeFromCart(state, { payload }) {
      state.cartElems = state.cartElems.filter(
        (prod) => prod.id !== payload.id
      );
      localStorage.setItem("cart", JSON.stringify(state.cartElems));
    },
    clearCart(state) {
      state.cartElems = [];
      localStorage.setItem("cart", JSON.stringify(state.cartElems));
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
