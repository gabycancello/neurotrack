import React from 'react';
import styled from 'styled-components';

// Estilização do Card com efeito neomórfico
const CardWrapper = styled.div`
  width: clamp(260px, 90%, 350px);
  height: clamp(180px, 50vw, 240px);
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.cardColor};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: all 0.3s ease-in-out;
  padding: clamp(15px, 4vw, 20px);
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    box-shadow: ${({ theme }) => theme.cardShadowHover};
    transform: scale(1.03);
  }

  @media (max-width: 400px) {
    border-radius: 15px;
    padding: 12px;
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(18px, 3vw, 22px);
  font-weight: 700;
`;

const CardDescription = styled.p`
  font-size: clamp(12px, 2.5vw, 16px);
  margin-top: 10px;
  font-weight: 400;
  opacity: 0.8;
`;

const Card = ({ title, description }) => {
  return (
    <CardWrapper>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardWrapper>
  );
};

export default Card;