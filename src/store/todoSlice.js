import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todos: localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [],
  filteredTodos: localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [],
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodoItem(state, { payload }) {
      const inList = state.todos.find((item) => item.text === payload);
      if (inList) {
        alert("Эта задача уже есть в списке");
      } else {
        state.todos.push({
          id: new Date().toISOString(),
          text: payload,
          completed: false,
        });
        localStorage.setItem("todos", JSON.stringify(state.todos));
        state.filteredTodos = state.todos;
      }
    },
    removeTodoItem(state, action) {
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      state.todos = filteredTodos;
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      state.filteredTodos = state.todos;
    },
    completeTodoItem(state, action) {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(state.todos));
        state.filteredTodos = state.todos;
      }
    },
    setFilter(state, action) {
      if (action.payload === "active") {
        state.filteredTodos = state.todos.filter((todo) => !todo.completed);
      } else if (action.payload === "completed") {
        state.filteredTodos = state.todos.filter((todo) => todo.completed);
      } else {
        state.filteredTodos = state.todos;
      }
    },
  },
});

export const { addTodoItem, removeTodoItem, completeTodoItem, setFilter } =
  todoSlice.actions;

export default todoSlice.reducer;
