import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./inputField.module.css";
import { addTodo, setFilter } from "../../api/todoApi";
export const InputField = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [value, setValue] = useState("all");
  const ref = useRef();
  function addTodoItem() {
    if (text.trim().length) {
      dispatch(addTodo(text));
      setText("");
      ref.current.focus();
    }
  }
  function add(event) {
    if (event.key !== "Enter" || !text.trim().length) return;
    dispatch(addTodo(text));
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
      <button className={styles.btn} onClick={addTodoItem}>
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
