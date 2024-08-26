import React, { useContext } from "react";
import {
  CartDetails,
  CartDetailsLeft,
  CartDetailsRight,
  CartHeader,
  CrossIcon,
  QuantityButton,
  Quantity,
  CartImage,
  CartPrice,
  CartScrollWrap,
  EmptyCartWrap,
  CartIcon,
  TotalPrice,
  CheckoutButton,
} from "../../styles/Cart";
import { faTimes, faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../ContextApi/AppContext";

const Cart = () => {
  const { state, dispatch } = useContext(AppContext);

  const baseURL = "http://localhost:1337";

  const increaseQuantity = (Name) => {
    dispatch({
      type: "Increment_Quantity",
      payload: { Name },
    });
  };

  const decreaseQuantity = (Name) => {
    dispatch({
      type: "Decrement_Quantity",
      payload: { Name },
    });
  };

  const formatPrice = (price) => {
    let prodPrice = price.slice(1);
    prodPrice = parseInt(prodPrice);
    return prodPrice;
  };

  const calculateTotal = () => {
    return state.cart.reduce(
      (total, prods) => total + prods.Quantity * formatPrice(prods.Price),
      0
    );
  };
  const closeCart = () => {
    const prodCart = document.querySelector(".show-cart");
    prodCart.classList.remove("openCart");
  };

  const removeProd = (Name) => {
    dispatch({ type: "DEL_PROD", payload: { Name } });
  };

  

  return (
    <div className="show-cart">
      <CartScrollWrap>
        <CartHeader>
          <h3>ORDER</h3>
          <CrossIcon icon={faTimes} onClick={closeCart} />
        </CartHeader>
        {state.cart.length > 0 ? (
          state.cart.map((prods, index) => (
            <CartDetails key={index}>
              <CartDetailsLeft>
                <CartImage src={`${baseURL}${prods.ProdImg}`} />
                <QuantityButton onClick={() => decreaseQuantity(prods.Name)}>
                  -
                </QuantityButton>
                <Quantity>{prods.Quantity}</Quantity>
                <QuantityButton onClick={() => increaseQuantity(prods.Name)}>
                  +
                </QuantityButton>
              </CartDetailsLeft>
              <CartDetailsRight>
                <CartPrice>{`$${
                  prods.Quantity * formatPrice(prods.Price)
                }`}</CartPrice>
                <CrossIcon
                  onClick={() => removeProd(prods.Name)}
                  icon={faTrash}
                />
              </CartDetailsRight>
            </CartDetails>
          ))
        ) : (
          <EmptyCartWrap>
            <CartIcon icon={faCartShopping} />
            <span>No products in cart</span>
          </EmptyCartWrap>
        )}
      </CartScrollWrap>
      <TotalPrice>Total : ${calculateTotal().toFixed(2)}</TotalPrice>
      <CheckoutButton>Checkout</CheckoutButton>
    </div>
  );
};

export default Cart;