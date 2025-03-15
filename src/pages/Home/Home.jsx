import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../../components/InputField/InputField";
import { TodoList } from "../../components/TodoList/TodoList";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { decrement, increment } from "../../store/productSlice";
import { addToCart } from "../../store/cartSlice";

export const Home = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  function addInCart(id, count) {
    dispatch(addToCart({ id, count }));
    navigate("/cart");
  }

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
                <button onClick={() => dispatch(increment({ id: product.id }))}>
                  +
                </button>
                <span>{product.amount}</span>
                <button onClick={() => dispatch(decrement({ id: product.id }))}>
                  -
                </button>
              </div>
              <button onClick={() => addInCart(product.id, product.amount)}>
                добавить
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
