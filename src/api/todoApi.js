import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = `http://localhost:3001/todos`;

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(baseURL);
      if (response.ok) {
        return await response.json();
      } else throw new Error("Server Error");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (text, { rejectWithValue }) => {
    try {
      const checkResponse = await fetch(`${baseURL}?text=${text}`);
      const existingTodos = await checkResponse.json();

      if (existingTodos.length > 0) {
        alert("Задача уже существует!");
        return rejectWithValue("Задача уже существует!");
      }
      const response = await fetch(baseURL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ text, completed: false }),
      });
      if (!response.ok) {
        throw new Error("Server Error");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Server Error");
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleCompleted = createAsyncThunk(
  "todos/toggleCompleted",
  async (id, { rejectWithValue, getState }) => {
    try {
      const currentTodo = getState().todo.todos.find((todo) => todo.id === id);
      if (!currentTodo) {
        throw new Error("Задача не найдена");
      }
      const response = await fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentTodo.completed }),
      });
      if (!response.ok) {
        throw new Error("Ошибка при обновлении задачи");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setFilter = createAsyncThunk(
  "todos/setFilter",
  async (select, { rejectWithValue }) => {
    try {
      if (select === "active") {
        const response = await fetch(`${baseURL}?completed=false`);
        if (!response.ok) throw new Error("Server Error");
        return await response.json();
      } else if (select === "completed") {
        const response = await fetch(`${baseURL}?completed=true`);
        if (!response.ok) throw new Error("Server Error");
        return await response.json();
      } else {
        const response = await fetch(baseURL);
        if (!response.ok) throw new Error("Server Error");
        return await response.json();
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
