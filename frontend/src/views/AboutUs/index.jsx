import React, { useContext, useEffect } from "react";
import {
  AboutButton,
  AboutUsBanner,
  AboutUsWrapper,
  AboutWrapper,
  AboutCatalog,
  AboutHeadline,
  AboutCard,
  AboutImage,
  AboutTitle,
  AboutPrice,
  AboutImageWrapper,
  AboutImageDetails,
  AddToCartButton,
} from "../../styles/AboutUs";
import { AppContext } from "../../ContextApi/AppContext";
import { useNavigate } from "react-router-dom";

const AboutUs = ({ aboutUs, featured }) => {
  const baseURL = "http://localhost:1337";
 const { state, dispatch } = useContext(AppContext);

   useEffect(() => {
     localStorage.setItem("cart", JSON.stringify(state.cart));
   }, [state.cart]);

  const addTocart = (id) => {
    const { Name, Price } = featured.products.data[id]["attributes"];

    const ProdImg =
      featured.products.data[id]["attributes"]["ProdImg"]["data"][0][
        "attributes"
      ]["url"];

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

  console.log(featured);
  

  const handleState = (id) => {
    navigate(`/DescPage/${id}`);
  };

  return (
    <AboutWrapper id="aboutus">
      <AboutUsBanner>
        <AboutUsWrapper>
          <h1>{aboutUs.Heading}</h1>
          <p>{aboutUs.Description}</p>
          <AboutButton>{aboutUs.Button}</AboutButton>
        </AboutUsWrapper>
      </AboutUsBanner>
      <AboutHeadline>{featured["Heading"]}</AboutHeadline>
      <AboutCatalog>
        {featured.products.data.map((Product, index) => (
          <AboutCard
            onClick={() => {
              handleState(Product.id);
            }}
            key={index}
          >
            <AboutImageWrapper>
              <AboutImage
                src={`${baseURL}${Product["attributes"]["ProdImg"]["data"][0]["attributes"]["url"]}`}
                alt={Product["attributes"]["Name"]}
              />
              <AboutImageDetails>
                <AboutPrice>{Product.attributes.Price}</AboutPrice>
                <AboutTitle>{Product.attributes.Name}</AboutTitle>
                <AddToCartButton
                  onClick={(e) => {
                    e.stopPropagation();
                    addTocart(index);
                  }}
                >
                  {Product["attributes"].Button}
                </AddToCartButton>
              </AboutImageDetails>
            </AboutImageWrapper>
          </AboutCard>
        ))}
      </AboutCatalog>
    </AboutWrapper>
  );
};

export default AboutUs;
