import { useReducer } from "react";
const initialState = {
  count: 0,
  history: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1,
        history: [...state.history, state.count],
      };
    case "decrement":
      return {
        count: state.count - 1,
        history: [...state.history, state.count],
      };
    default:
      return state;
  }
}
export const Redux = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
};
