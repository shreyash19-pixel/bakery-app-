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
  ExportLinkWrapper,
} from "../../styles/ExploreMore";

import Loader from "../../components/Loader";
import { AppContext } from "../../ContextApi/AppContext";
import { useNavigate } from "react-router-dom";

const ExploreMore = ({ explore }) => {
  const [activeCat, setActiveCat] = useState([explore["Categories"][0]]);
  const [loading, setLoading] = useState(false);
  const [isactive, setIsactive] = useState(0);
  const { state, dispatch } = useContext(AppContext);

  const setCategory = (cat, index) => {
    setIsactive(index);
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
      <ExportLinkWrapper>
        {explore["Categories"].map((categories, index) => (
          <ExportLink
            key={categories.CategoryType}
            onClick={() => setCategory(index, index)}
            col={isactive === index ? "active" : ""}
          >
            {categories.CategoryType}
          </ExportLink>
        ))}
      </ExportLinkWrapper>
      {loading ? (
        <Loader />
      ) : (
        <ProductCatalog>
          {activeCat.map((product) => (
            <ProductCard key={product.id}>
              {product.products.data.map((prod, j) => (
                <ProductImageWrapper
                  key={prod.id}
                  onClick={() => {
                    handleState(prod.id);
                  }}
                >
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
