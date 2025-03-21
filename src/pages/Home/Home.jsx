import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../../components/InputField/InputField";
import { TodoList } from "../../components/TodoList/TodoList";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  amountDecrement,
  amountIncrement,
  fetchProducts,
} from "../../api/productsApi";
import { addToCart } from "../../api/cartApi";

export const Home = () => {
  const { products, totalPages } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  function addInCart(id) {
    dispatch(addToCart(id));
    navigate("/cart");
  }
  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [currentPage]);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
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
        <button className={styles.paginateBtn} onClick={handleNextPage}>
          next
        </button>
        <button className={styles.paginateBtn} onClick={handlePrevPage}>
          back
        </button>
      </div>
    </>
  );
};
