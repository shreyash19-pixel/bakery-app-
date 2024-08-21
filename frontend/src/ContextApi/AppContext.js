import { createContext, useReducer } from 'react';

export const AppContext = createContext();

const storedCart = JSON.parse(localStorage.getItem("cart")) ?? [];

const initialState = {
  cart: storedCart,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "Increment_Quantity":
      return {
        ...state,
        cart: state.cart.map((prod) =>
          prod.Name === action.payload.Name
            ? { ...prod, Quantity: prod.Quantity + 1 }
            : prod
        ),
      };

    case "Decrement_Quantity":
      return {
        ...state,
        cart: state.cart
          .map((prod) =>
            prod.Name === action.payload.Name
              ? { ...prod, Quantity: prod.Quantity - 1 }
              : prod
          )
          .filter((prod) => prod.Quantity > 0),
      };

    case "DEL_PROD":
      return {
        ...state,
        cart: state.cart.filter((prod) => prod.Name !== action.payload.Name),
      };
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
