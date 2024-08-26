import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CartScrollWrap = styled.div`
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  scrollbar-width: none;
`;


export const CartHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 24px;
    color: #5c4033; 
    font-weight: 600;
  }
`;

export const CrossIcon = styled(FontAwesomeIcon)`
  color: #a0522d; 
  font-size: 26px;
  cursor: pointer;

  &:hover {
    color: #8b4513;
    transform: scale(1.1);
    transition: color 0.3s ease, transform 0.3s ease;
  }
`;

export const CartDetails = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e2c3a3;

  &:last-child {
    border-bottom: none;
  }
`;

export const EmptyCartWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;

  span {
    font-size: 22px;
    color: #a0522d;
  }
`;

export const CartIcon = styled(FontAwesomeIcon)`
  color: #8b4513;
  font-size: 42px;
`;

export const CartDetailsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const CartImage = styled.img`
  width: 56px;
  border-radius: 8px; /* Softer corners */
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Slight shadow for a cozy feel */
`;

export const CartDetailsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const QuantityButton = styled.button`
  background-color: #d4a373; /* Warm button color */
  border: none;
  border-radius: 6px; /* Softer corners */
  cursor: pointer;
  font-size: 16px;
  padding: 6px 10px;
  color: #fff;

  &:hover {
    background-color: #c98a5a;
    border-color: #8b4513;
  }
`;

export const Quantity = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #5c4033;
`;

export const CartPrice = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #8b4513;
`;

export const TotalPrice = styled.h3`
  margin-top: 30px;
  font-size: 22px;
  font-weight: 600;
  color: #5c4033;
  text-align: left; 
`;

export const CheckoutButton = styled.button`
  color: #e9bd8c;
  border: none;
  border-radius: 5px;
  background-color: #8b4513;
  font-size: 16px;
  padding: 10px 125px;
  cursor: pointer;
  margin-top: 30px;

  &:hover {
    background-color: #d49b75;
  }
`;