import { createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = `http://localhost:3001/cart`;
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(baseURL);
      if (!response.ok) throw new Error("Server Error");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (id, { rejectWithValue, getState }) => {
    try {
      const existingProd = getState().products.products.find(
        (prod) => prod.id === id
      );

      if (!existingProd) {
        return rejectWithValue("Товар не найден");
      }

      const response = await fetch(`${baseURL}?id=${id}`);

      if (!response.ok) {
        throw new Error("Ошибка при проверке товара в корзине");
      }

      const cartProduct = await response.json();

      if (cartProduct.length === 0) {
        const addResponse = await fetch(baseURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: existingProd.id,
            name: existingProd.name,
            price: existingProd.price,
            amount: existingProd.amount,
          }),
        });

        if (!addResponse.ok) {
          throw new Error("Не удалось добавить товар в корзину");
        }

        return await addResponse.json();
      } else {
        const product = cartProduct[0];

        const updateResponse = await fetch(`${baseURL}/${product.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: existingProd.amount }),
        });

        if (!updateResponse.ok) {
          throw new Error("Не удалось обновить товар в корзине");
        }
        return await updateResponse.json();
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Ошибка при удалении	");
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(baseURL);
      const items = await res.json();

      await Promise.all(
        items.map((item) =>
          fetch(`${baseURL}/${item.id}`, {
            method: "DELETE",
          })
        )
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
