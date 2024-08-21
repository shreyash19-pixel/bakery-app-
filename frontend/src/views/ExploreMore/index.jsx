import React, { useContext, useState, useEffect } from "react";
import {
  ExploreWrapper,
  ExportLink,
  ProductCatalog,
  ProductHeadline,
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductPrice,
  ProductImageWrapper,
  ProductImageDetails,
  AddToCartButton,
} from "../../styles/ExploreMore";

import Loader from "../../components/Loader";
import { AppContext } from "../../ContextApi/AppContext";
import { useNavigate } from "react-router-dom";

const ExploreMore = ({ explore }) => {
  const [activeCat, setActiveCat] = useState([explore["Categories"][0]]);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const setCategory = (cat) => {
    setLoading(true);
    setTimeout(() => {
      setActiveCat([explore["Categories"][cat]]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const baseURL = "http://localhost:1337";

  const addToCart = (i, j) => {
    const prodCart = document.querySelector(".show-cart");
    prodCart.classList.add("openCart");
    const { Name, Price } =
      explore["Categories"][i]["products"]["data"][j]["attributes"];

    const ProdImg =
      explore["Categories"][i]["products"]["data"][j]["attributes"]["ProdImg"][
        "data"
      ][0]["attributes"]["url"];

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
     console.log(`Navigating to product with id: ${id}`);
    navigate(`/DescPage/${id}`);
  };

  return (
    <ExploreWrapper>
      <ProductHeadline>Explore More</ProductHeadline>
      <ExportLink>
        {explore["Categories"].map((categories, index) => (
          <div key={categories.CategoryType} onClick={() => setCategory(index)}>
            {categories.CategoryType}
          </div>
        ))}
      </ExportLink>
      {loading ? (
        <Loader />
      ) : (
        <ProductCatalog>
          {activeCat.map((product) => (
            <ProductCard
              onClick={() => {
                handleState(product.id);
              }}
              key={product.id}
            >
              {product.products.data.map((prod, j) => (
                <ProductImageWrapper key={prod.id}>
                  <ProductImage
                    src={`${baseURL}${prod.attributes.ProdImg.data[0].attributes.url}`}
                    alt={prod.attributes.Name}
                  />
                  <ProductImageDetails>
                    <ProductPrice>{prod.attributes.Price}</ProductPrice>
                    <ProductTitle>{prod.attributes.Name}</ProductTitle>
                    <AddToCartButton
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id - 1, j);
                      }}
                    >
                      {prod.attributes.Button}
                    </AddToCartButton>
                  </ProductImageDetails>
                </ProductImageWrapper>
              ))}
            </ProductCard>
          ))}
        </ProductCatalog>
      )}
    </ExploreWrapper>
  );
};

export default ExploreMore;
