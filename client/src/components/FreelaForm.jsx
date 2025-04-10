import React, { useState, useEffect } from "react";
import styled, { keyframes, useTheme } from "styled-components";
import ModalComponent from "./ModalComponent";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${({ theme }) => theme.background};
  padding: 25px 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 420px;
  box-shadow: ${({ theme }) => theme.shadow}, inset 4px 4px 8px ${({ theme }) => theme.shadowLight}, inset -4px -4px 8px ${({ theme }) => theme.shadowDark};
  animation: ${fadeIn} 0.4s ease-out;
  transition: all 0.3s ease-in-out;
  text-align: center;

  @media (max-width: 480px) {
    padding: 20px;
  }

  h3 {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.text};
    font-size: 1.3rem;
    text-shadow: 1px 1px 0 ${({ theme }) => theme.shadowLight};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin-top: 12px;
  border: none;
  border-radius: 12px;
  outline: none;
  font-size: 1em;
  background: ${({ theme }) => theme.inputBackground || theme.background};
  color: ${({ theme }) => theme.text};
  box-shadow: inset 6px 6px 12px ${({ theme }) => theme.shadowLight}, inset -6px -6px 12px ${({ theme }) => theme.shadowDark};
  transition: all 0.3s ease;

  &:focus {
    box-shadow: inset 4px 4px 8px ${({ theme }) => theme.shadowDark}, inset -4px -4px 8px ${({ theme }) => theme.shadowLight};
    background: ${({ theme }) => theme.inputFocusBackground || theme.inputBackground};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.buttonBackground || theme.background};
  color: ${({ theme }) => theme.buttonText || theme.text};
  border: none;
  padding: 14px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  margin-top: 15px;
  width: 100%;
  box-shadow: 6px 6px 12px ${({ theme }) => theme.shadowDark}, -6px -6px 12px ${({ theme }) => theme.shadowLight};
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: inset 4px 4px 8px ${({ theme }) => theme.shadowDark}, inset -4px -4px 8px ${({ theme }) => theme.shadowLight};
    transform: scale(1.02);
  }

  &:active {
    box-shadow: inset 2px 2px 4px ${({ theme }) => theme.shadowDark}, inset -2px -2px 4px ${({ theme }) => theme.shadowLight};
    transform: scale(0.98);
  }
`;

const FreelaForm = ({ isOpen, onRequestClose, onSubmit, freelaToEdit = null }) => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    if (freelaToEdit) {
      setName(freelaToEdit.name);
      setSkills(freelaToEdit.skills?.join(", ") || "");
    } else {
      setName("");
      setSkills("");
    }
  }, [freelaToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !skills.trim()) return;

    try {
      const url = freelaToEdit
        ? `${import.meta.env.VITE_API_URL}/api/freelancer/update/${freelaToEdit._id}`
        : `${import.meta.env.VITE_API_URL}/api/freelancer/add`;

      const method = freelaToEdit ? "PUT" : "POST";

      const bodyData = {
        name,
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
      };

      console.log("Dados enviados:", bodyData);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar freelancer");

      const result = await response.json();
      console.log("Freelancer cadastrado:", result);

      if (onSubmit) onSubmit(result);

      setName("");
      setSkills("");
      onRequestClose();
    } catch (err) {
      console.error("Erro:", err);
    }
  };

  return (
    <ModalComponent isOpen={isOpen} onRequestClose={onRequestClose}>
      <FormContainer>
        <h3>{freelaToEdit ? "Editar Freelancer" : "Cadastro de Freelancer"}</h3>

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome do Freelancer"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Especialidades (ex: React, Node.js)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <Button type="submit">
            {freelaToEdit ? "Atualizar" : "Cadastrar"}
          </Button>

          <Button
            type="button"
            onClick={onRequestClose}
            style={{
              background: "#d9534f",
              color: "#fff",
              boxShadow: `6px 6px 12px ${theme.shadowDark}, -6px -6px 12px ${theme.shadowLight}`
            }}
          >
            Cancelar
          </Button>
        </form>
      </FormContainer>
    </ModalComponent>
  );
};

export default FreelaForm;