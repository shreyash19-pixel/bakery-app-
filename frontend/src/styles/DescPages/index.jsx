import styled from "styled-components";

export const DescContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DescWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px;
  gap: 90px;
`;

export const DescImgWrapper = styled.div`
 flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const ImgWrapper = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

export const DescTextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: start;
`;

export const Description = styled.h1`
  font-family: "Josefin Sans";
  font-size: 40px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  width: 200px;
`;

export const BuyButton = styled.button`
  padding: 10px;
  border-radius: 32px;
  font-family: "Josefin Sans";
  font-size: 25px;
  background-color: #fbc400;
`;

export const ReviewSection = styled.div`
  width: 100%;
  border-radius: 10px;
`;

export const OtherProductsSection = styled.div`
  width: 100%;
  height: 100%;
  max-height: 150px;
  border-radius: 10px;
`;

export const DescProductSection = styled.div`
  width: 100%;
  height: 100%;
  max-height: 200px;
  border-radius: 10px;
`;
