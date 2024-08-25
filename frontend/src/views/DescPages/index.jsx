import React, { useContext } from "react";
import {
  DescContainer,
  DescWrapper,
  DescImgWrapper,
  ImgWrapper,
  DescTextWrapper,
  Description,
  ButtonWrapper,
  BuyButton,
  ReviewSection,
  OtherProductsSection,
  DescProductSection,
} from "../../styles/DescPages";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const DescPages = () => {
  const { id } = useParams();
  const baseURL = `http://localhost:1337`;
  const URL = `http://localhost:1337/api/products/${id}?populate=deep,10`;

  const { data, loading, error } = useFetch(URL)

 if (loading) return <div>Loading....</div>;
 if (error) return <div>{error}</div>;

  return (
    <DescContainer>
      <DescWrapper>
        <DescImgWrapper>
          <ImgWrapper
            src={`${baseURL}${data["attributes"]["ProdImg"]["data"][0]["attributes"]["url"]}`}
            alt={data["attributes"]}
          />
        </DescImgWrapper>
        <DescTextWrapper>
          <Description>{data["attributes"]["Name"]}</Description>
          <ReviewSection>Stars and facts here</ReviewSection>
          <OtherProductsSection>
            Images of other products here inside circles
          </OtherProductsSection>
          <ButtonWrapper>
            <BuyButton>Add to Cart</BuyButton>
          </ButtonWrapper>
          <DescProductSection>
            Actual Description of the product
          </DescProductSection>
        </DescTextWrapper>
      </DescWrapper>
    </DescContainer>
  );
};

export default DescPages;
