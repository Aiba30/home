import { useDispatch } from "react-redux";
import { removeTodo, toggleCompleted } from "../../api/todoApi.js";
import styles from "./todoItem.module.css";
export const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <li className={styles.item}>
      <input
        onChange={() => dispatch(toggleCompleted(todo.id))}
        checked={todo.completed}
        type="checkbox"
      />
      <span>{todo.text}</span>
      <button
        className={styles.btn}
        onClick={() => dispatch(removeTodo(todo.id))}
      >
        delete
      </button>
    </li>
  );
};
