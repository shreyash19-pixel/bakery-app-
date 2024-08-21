import React, { useState, useContext, useEffect } from "react";

import {
  ProductWrapper,
  ProductCatalog,
  ProductHeadline,
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductPrice,
  ProductImageWrapper,
  ProductImageDetails,
  AddToCartButton,
  ProductBanner,
  ProductButton,
} from "../../styles/TopProducts";
import { AppContext } from "../../ContextApi/AppContext";
import { useNavigate } from "react-router-dom";

const TopProducts = ({ topProducts, firstOrder }) => {
  const baseURL = "http://localhost:1337";
  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (id) => {
    const prodCart = document.querySelector(".show-cart");
    prodCart.classList.add("openCart");

    const { Name, Price } = topProducts[id]["attributes"];
    const ProdImg =
      topProducts[id]["attributes"]["ProdImg"]["data"][0]["attributes"]["url"];

    const isProductExists = state.cart.find((prod) => prod.Name === Name);

    if (!isProductExists) {
      dispatch({
        type: "ADD_PRODUCT_TO_CART",
        payload: { Name, Price, ProdImg, Quantity: 1 },
      });
    } else {
      dispatch({
        type: "Increment_Quantity",
        payload: { Name },
      });
    }
  };

  const navigate = useNavigate();

  const handleState = (id) => {
    navigate(`/DescPage/${id}`);
  };

  return (
    <ProductWrapper id="top-products">
      <ProductHeadline>Top Products</ProductHeadline>
      <ProductCatalog>
        {topProducts.map((product, index) => (
          <ProductCard
            onClick={() => {
              handleState(product.id);
            }}
            key={product.id}
          >
            <ProductImageWrapper>
              <ProductImage
                src={`${baseURL}${product["attributes"].ProdImg["data"][0]["attributes"]["url"]}`}
                alt={product["attributes"].Name}
              />
              <ProductImageDetails>
                <ProductPrice>{product["attributes"].Price}</ProductPrice>
                <ProductTitle>{product["attributes"].Name}</ProductTitle>
                <AddToCartButton
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(index);
                  }}
                >
                  {product["attributes"].Button}
                </AddToCartButton>
              </ProductImageDetails>
            </ProductImageWrapper>
          </ProductCard>
        ))}
      </ProductCatalog>
      <ProductBanner>
        <h1>{firstOrder.Heading}</h1>
        <p>{firstOrder.Description}</p>
        <ProductButton> {firstOrder.Button}</ProductButton>
      </ProductBanner>
    </ProductWrapper>
  );
};

export default TopProducts;
