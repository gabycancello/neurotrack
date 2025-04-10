import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaTrash, FaCheck } from "react-icons/fa";
import FreelaList from "./FreelaList";

// Animações
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const completeBounce = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.05); }
  70% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const TaskContainer = styled.div`
  background: ${({ theme }) => theme.taskBackground};
  padding: 20px;
  border-radius: 18px;
  max-width: 90%;
  width: 400px;
  box-shadow: ${({ theme }) => theme.taskShadow};
  animation: ${fadeIn} 0.4s ease-out;
  transition: box-shadow 0.3s ease, background 0.3s ease;
  @media (max-width: 500px) {
    padding: 15px;
    width: 100%;
  }
`;

const TaskInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: none;
  border-radius: 12px;
  outline: none;
  font-size: clamp(14px, 3vw, 16px);
  background: ${({ theme }) => theme.taskBackground};
  color: ${({ theme }) => theme.taskText};
  box-shadow: ${({ theme }) => theme.taskShadowInset};
  transition: box-shadow 0.3s ease, transform 0.2s ease;

  &:focus {
    box-shadow: ${({ theme }) => theme.taskShadowFocus};
    transform: scale(1.015);
  }
`;

const TaskButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  font-size: clamp(14px, 3vw, 16px);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: ${({ theme }) => theme.taskBackground};
  color: ${({ theme }) => theme.taskText};
  box-shadow: ${({ theme }) => theme.taskShadow};
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.taskShadowHover};
  }

  &:active {
    transform: translateY(1px);
    box-shadow: ${({ theme }) => theme.taskShadowInsetFocus};
  }
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.taskBackground};
  padding: 12px;
  border-radius: 12px;
  margin-top: 10px;
  font-size: clamp(14px, 3vw, 16px);
  box-shadow: ${({ $completed, theme }) =>
    $completed ? theme.taskShadowInset : theme.taskShadow};
  transition: all 0.3s ease;
  animation: ${({ $completed }) => $completed && completeBounce} 0.3s ease;

  span {
    flex: 1;
    color: ${({ theme }) => theme.taskText};
    text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
    transition: text-decoration 0.3s ease;
  }

  svg {
    cursor: pointer;
    margin-left: 12px;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.15);
      color: ${({ theme }) => theme.taskHighlight};
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

const FilterButton = styled.button`
  padding: 8px 14px;
  margin: 5px;
  font-size: clamp(12px, 3vw, 14px);
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.taskBackground};
  color: ${({ $active, theme }) =>
    $active ? theme.taskHighlight : theme.taskText};
  box-shadow: ${({ theme }) => theme.taskShadow};
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.taskShadowHover};
  }

  &:active {
    transform: translateY(1px);
    box-shadow: ${({ theme }) => theme.taskShadowInsetFocus};
  }
`;

const TaskList = ({ tasks = [], addTask, toggleTask, deleteTask }) => {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("todas");
  const [order, setOrder] = useState("recentes");

  const handleAddTask = () => {
    if (task.trim()) {
      addTask({ text: task, id: Date.now(), completed: false });
      setTask("");
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "concluídas") return t.completed;
    if (filter === "pendentes") return !t.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (order === "alfabética") return a.text.localeCompare(b.text);
    return b.id - a.id;
  });

  return (
    <TaskContainer>
      <h3>Lista de Tarefas</h3>
      <div>
        <TaskInput
          type="text"
          placeholder="Adicionar tarefa..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <TaskButton onClick={handleAddTask}>
          Adicionar
        </TaskButton>
      </div>

      <div>
        <FilterButton
          $active={filter === "todas"}
          onClick={() => setFilter("todas")}
        >
          Todas
        </FilterButton>
        <FilterButton
          $active={filter === "concluídas"}
          onClick={() => setFilter("concluídas")}
        >
          Concluídas
        </FilterButton>
        <FilterButton
          $active={filter === "pendentes"}
          onClick={() => setFilter("pendentes")}
        >
          Pendentes
        </FilterButton>
      </div>

      {sortedTasks.map((t) => (
        <TaskItem key={t.id} $completed={t.completed}>
          <span>{t.text}</span>
          <FaCheck onClick={() => toggleTask(t.id)} />
          <FaTrash onClick={() => deleteTask(t.id)} />
        </TaskItem>
      ))}

    </TaskContainer>
  );
};

export default TaskList;