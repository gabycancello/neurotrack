import React from "react";
import styled from "styled-components";

// Botão com efeito neomórfico aprimorado
const ButtonWrapper = styled.button`
  padding: clamp(10px, 3vw, 14px) clamp(16px, 5vw, 28px);
  border-radius: 12px;
  background: ${({ theme }) => theme.buttonBackground};
  border: none;
  color: ${({ theme }) => theme.buttonColor};
  font-size: clamp(14px, 2vw, 16px);
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease-in-out;

  box-shadow: ${({ theme }) => theme.shadow};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowHover};
    transform: scale(1.03);
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadowActive};
    transform: scale(0.97);
  }

  @media (max-width: 400px) {
    border-radius: 10px;
    font-size: 14px;
    padding: 10px 18px;
  }
`;

const Button = ({ label, children, onClick }) => {
  return (
    <ButtonWrapper onClick={onClick} aria-label={label}>
      {children || label}
    </ButtonWrapper>
  );
};

export default Button;