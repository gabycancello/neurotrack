import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import api from "../api/axios";
import FreelaForm from "./FreelaForm";

const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
  background: ${({ theme }) => theme.taskBackground};
  padding: 30px 25px;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.taskShadow};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.taskText};
  font-size: 1.5em;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 1em;
  }
`;

const TopActions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0px;
`;

const ListItem = styled.li`
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.cardShadow};
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.cardColor};
  transition: box-shadow 0.3s ease, transform 0.2s ease;

  &:hover {
  transform: translateY(-3px);
  box-shadow: ${({ theme }) => theme.cardShadowHover};

  strong {
    font-size: 1.2em;
    letter-spacing: 0.5px;
  }

  span {
  font-size: 1.2em;
  opacity: 0.9;
  }

  @media (max-width: 768px) {
    font-size: 0.85em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
    padding: 8px;
  }
`;

const Message = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.taskText};
  opacity: 0.7;
  font-size: 1em;

  @media (max-width: 480px) {
    font-size: 0.85em;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 12px;
  font-size: 0.9em;
  font-weight: 600;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    box-shadow: ${({ theme }) => theme.taskShadowInsetFocus};
    transform: translateY(-2px);

  &.delete {
    background-color: #d9534f;
    color: #fff;
    box-shadow: inset 3px 3px 7px rgba(0, 0, 0, 0.3),
      inset -3px -3px 7px rgba(255, 255, 255, 0.1);
  }

  &:hover {
    filter: brightness(0.95);
  }
`;

const FreelaList = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [editingFreela, setEditingFreela] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();

  const fetchFreelancers = async () => {
    try {
      console.log("Buscando freelancers...");
      const response = await api.get("/freelancer");
      console.log("Resposta completa:", response);
      setFreelancers(response.data);
    } catch (error) {
      console.error("Erro ao buscar freelancers", error);
    }
  };

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/freelancer/${id}`);
      fetchFreelancers();
    } catch (error) {
      console.error("Erro ao deletar freelancer", error);
    }
  };

  const handleEdit = (freela) => {
    setEditingFreela(freela);
    setIsModalOpen(true);
  };

  const handleNewFreelancer = () => {
    setEditingFreela(null);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
      fetchFreelancers();
      setIsModalOpen(false);
      setEditingFreela(null);
  };

  return (
    <Container>
      <Title>Lista de Freelancers</Title>

      <TopActions>
        <Button onClick={handleNewFreelancer}>Novo Freelancer</Button>
      </TopActions>

      <List>
        {freelancers.length > 0 ? (
          freelancers.map((freela) => (
            <ListItem key={freela._id}>
              <strong>{freela.name}</strong>
              <span>
                {Array.isArray(freela.skills)
                ? freela.skills.join(",")
                : freela.skills}
              </span>
              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <Button onClick={() => handleEdit(freela)}>Editar</Button>
                <Button className="delete" onClick={() => handleDelete(freela._id)}>Deletar</Button>
              </div>
            </ListItem>
          ))
        ) : (
          <Message>Nenhum freelancer cadastrado ainda.</Message>
        )}
      </List>

      {isModalOpen && (
        <FreelaForm
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={handleUpdate}
          freelaToEdit={editingFreela}
        />
      )}
    </Container>
  );
};

export default FreelaList;