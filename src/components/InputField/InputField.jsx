import { useRef, useState } from "react";
import { addTodoItem, setFilter } from "../../store/todoSlice";
import { useDispatch } from "react-redux";
import styles from "./inputField.module.css";
export const InputField = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [value, setValue] = useState("all");
  const ref = useRef();
  function addTodo() {
    if (text.trim().length) {
      dispatch(addTodoItem(text));
      setText("");
      ref.current.focus();
    }
  }
  function add(event) {
    if (event.key !== "Enter" || !text.trim().length) return;
    dispatch(addTodoItem(text));
    setText("");
  }
  function handleChange(event) {
    setValue(event.target.value);
    dispatch(setFilter(event.target.value));
  }
  return (
    <div className={styles.block}>
      <input
        ref={ref}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={add}
        type="text"
        id=""
      />
      <button className={styles.btn} onClick={addTodo}>
        add
      </button>
      <select value={value} onChange={handleChange} id="">
        <option value="all">все</option>
        <option value="active">активные</option>
        <option value="completed">выполненные</option>
      </select>
    </div>
  );
};
