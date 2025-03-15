import { useDispatch } from "react-redux";
import { completeTodoItem, removeTodoItem } from "../../store/todoSlice";
import styles from "./todoItem.module.css";
export const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <li className={styles.item}>
      <input
        onChange={() => dispatch(completeTodoItem(todo.id))}
        checked={todo.completed}
        type="checkbox"
      />
      <span>{todo.text}</span>
      <button
        className={styles.btn}
        onClick={() => dispatch(removeTodoItem(todo.id))}
      >
        delete
      </button>
    </li>
  );
};
