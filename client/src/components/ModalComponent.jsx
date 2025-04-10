import React, { useEffect, useRef } from "react";
import Modal from "react-modal";
import styled, { keyframes } from "styled-components";
import { FaTimes } from "react-icons/fa";

// Animação de entrada
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Animação neomórfica pulsante – Modo Claro
const pulseShadowLight = keyframes`
  0%, 100% {
    box-shadow: 
      8px 8px 20px rgba(0,0,0,0.1),
      -6px -6px 16px #ffffff,
      inset 2px 2px 6px rgba(255,255,255,0.6),
      inset -2px -2px 6px rgba(0,0,0,0.05);
  }
  50% {
    box-shadow:
      10px 10px 24px rgba(0,0,0,0.15),
      -8px -8px 18px #ffffff,
      inset 1px 1px 4px rgba(255,255,255,0.7),
      inset -1px -1px 4px rgba(0,0,0,0.06);
  }
`;

// Animação neomórfica pulsante – Modo Escuro
const pulseShadowDark = keyframes`
  0%, 100% {
    box-shadow: 
      8px 8px 16px #1a1a1a,
      -8px -8px 16px #2e2e2e,
      inset 2px 2px 4px rgba(255,255,255,0.03),
      inset -2px -2px 4px rgba(0,0,0,0.2);
  }
  50% {
    box-shadow:
      10px 10px 20px #151515,
      -10px -10px 20px #2f2f2f,
      inset 1px 1px 2px rgba(255,255,255,0.06),
      inset -1px -1px 2px rgba(0,0,0,0.25);
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ModalContent = styled.div`
  position: relative;
  background: ${(props) =>
    props.$darkMode
      ? "linear-gradient(145deg, #1f1f1f, #2a2a2a)"
      : "linear-gradient(145deg, #dcdcdc, #f5f5f5)"};
  color: ${(props) => (props.$darkMode ? "#f0f0f0" : "#111111")};
  border-radius: 22px;
  padding: 36px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px);
  animation: 
    ${fadeIn} 0.35s ease,
    ${(props) => (props.$darkMode ? pulseShadowDark : pulseShadowLight)} 6s ease-in-out infinite;
  transition: all 0.4s ease;

  @media (max-width: 480px) {
    padding: 28px;
  }

  h1, h2, h3 {
    text-shadow: ${(props) =>
      props.$darkMode
        ? "1px 1px 2px rgba(0,0,0,0.8)"
        : "1px 1px 2px rgba(255,255,255,0.6)"};
    transition: text-shadow 0.3s ease;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: ${(props) => (props.$darkMode ? "#252525" : "#e0e0e0")};
  color: ${(props) => (props.$darkMode ? "#ffffff" : "#333333")};
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: ${(props) =>
    props.$darkMode
      ? `
        6px 6px 12px #1a1a1a,
        -6px -6px 12px #2e2e2e,
        inset 1px 1px 3px rgba(255,255,255,0.03),
        inset -1px -1px 3px rgba(0,0,0,0.15)`
      : `
        6px 6px 12px #bebebe,
        -6px -6px 12px #ffffff,
        inset 1px 1px 3px rgba(255,255,255,0.7),
        inset -1px -1px 3px rgba(0,0,0,0.05)`};
  transition: all 0.3s ease;
  transition-delay: 0.05s;
  backdrop-filter: blur(3px);

  &:hover {
    transform: scale(1.1);
    box-shadow: ${(props) =>
      props.$darkMode
        ? `
          inset 3px 3px 6px #1a1a1a,
          inset -3px -3px 6px #2e2e2e`
        : `
          inset 3px 3px 6px #bebebe,
          inset -3px -3px 6px #ffffff`};
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: 2px solid ${(props) => (props.$darkMode ? "#ff4d4d" : "#d9534f")};
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 24px;
  text-align: center;
  padding: 12px 0;
  border-radius: 12px;
  background: ${(props) =>
    props.$darkMode
      ? "linear-gradient(145deg, #1f1f1f, #292929)"
      : "linear-gradient(145deg, #e6e6e6, #ffffff)"};
  box-shadow: ${(props) =>
    props.$darkMode
      ? "4px 4px 8px #1a1a1a, -4px -4px 8px #2a2a2a"
      : "4px 4px 8px #bebebe, -4px -4px 8px #ffffff"};
  color: ${(props) => (props.$darkMode ? "#f8f8f8" : "#222222")};
  transition: all 0.3s ease;
`;

// Componente principal
const ModalComponent = ({ isOpen, onClose, children, darkMode, title }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    Modal.setAppElement("#root"); // Corrige o problema do botão de fechar
  }, []);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <ModalContent ref={modalRef} $darkMode={darkMode}>
        <CloseButton onClick={onClose} aria-label="Fechar modal" $darkMode={darkMode}>
          <FaTimes />
        </CloseButton>
        {title && <ModalTitle $darkMode={darkMode}>{title}</ModalTitle>}
        {children}
      </ModalContent>
    </StyledModal>
  );
};

export default ModalComponent;