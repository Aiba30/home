import { useDispatch, useSelector } from "react-redux";
import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./todoList.module.css";
import { useEffect } from "react";
import { fetchTodos } from "../../api/todoApi";
export const TodoList = () => {
  const { todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  return (
    <ul className={styles.list}>
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};
