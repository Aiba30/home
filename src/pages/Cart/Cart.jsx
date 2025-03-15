import { useDispatch, useSelector } from "react-redux";
import styles from "./cart.module.css";
import { clearCart, removeFromCart } from "../../store/cartSlice";
export const Cart = () => {
  const { cartElems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  function sum(count, price) {
    return count * price;
  }
  function sumOfAllProducts() {
    return cartElems.reduce(
      (acc, elem) => acc + sum(elem.amount, elem.price),
      0
    );
  }
  return (
    <div>
      <h1 className={styles.title}>Cart</h1>
      {cartElems.length ? (
        <>
          <div className={styles.container}>
            {cartElems.map((product) => {
              return (
                <div key={product.id}>
                  <p>{product.name}</p>
                  <p> цена {product.price}</p>
                  <p>
                    кол-во: {product.amount} сумма:
                    {sum(product.amount, product.price)}
                  </p>
                  <button
                    className={styles.removeBtn}
                    onClick={() => dispatch(removeFromCart({ id: product.id }))}
                  >
                    удалить товар
                  </button>
                </div>
              );
            })}
          </div>
          <hr />
          <p>Общая сумма : {sumOfAllProducts()}</p>
          <button
            className={styles.clearBtn}
            onClick={() => dispatch(clearCart())}
          >
            очистить корзину
          </button>
        </>
      ) : (
        <h2>Корзина пуста</h2>
      )}
    </div>
  );
};
