import { useSelector } from "react-redux";
import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./todoList.module.css";
export const TodoList = () => {
  const { filteredTodos } = useSelector((state) => state.todo);
  return (
    <ul className={styles.list}>
      {filteredTodos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};
