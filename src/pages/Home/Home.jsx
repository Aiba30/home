import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../../components/InputField/InputField";
import { TodoList } from "../../components/TodoList/TodoList";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  amountDecrement,
  amountIncrement,
  fetchProducts,
} from "../../api/productsApi";
import { addToCart } from "../../api/cartApi";

export const Home = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  function addInCart(id) {
    dispatch(addToCart(id));
    navigate("/cart");
  }
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <div className="todo-container">
        <h1>TodoList</h1>
        <InputField />
        <TodoList />
      </div>
      <div className={styles.container}>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <p className={styles.name}>{product.name}</p>
              <p className={styles.price}>{product.price}</p>
              <div className={styles.counterContainer}>
                <button onClick={() => dispatch(amountIncrement(product.id))}>
                  +
                </button>
                <span>{product.amount}</span>
                <button onClick={() => dispatch(amountDecrement(product.id))}>
                  -
                </button>
              </div>
              <button onClick={() => addInCart(product.id)}>добавить</button>
            </div>
          );
        })}
      </div>
    </>
  );
};
