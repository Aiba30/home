import { createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = `http://localhost:3001/products`;
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (currentPage, { rejectWithValue }) => {
    try {
      const response = await fetch(
        baseURL + `?_page=${currentPage}&_per_page=3`
      );
      if (!response.ok) throw new Error("Server Error");
      const { data, pages } = await response.json();
      return { data, pages };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const amountIncrement = createAsyncThunk(
  "products/amountIncrement",
  async (id, { rejectWithValue, getState }) => {
    try {
      const product = getState().products.products.find(
        (prod) => prod.id === id
      );
      const response = await fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: product.amount + 1 }),
      });
      if (!response.ok) throw new Error("Ошибка при изменении");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const amountDecrement = createAsyncThunk(
  "products/amountDecrement",
  async (id, { rejectWithValue, getState }) => {
    try {
      const product = getState().products.products.find(
        (prod) => prod.id === id
      );
      if (product.amount === 1) return;
      const response = await fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: product.amount - 1 }),
      });
      if (!response.ok) throw new Error("Ошибка при изменении");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
