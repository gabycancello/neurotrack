import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import TaskList from "./TaskList";
import Button from "./Button";
import { FaTrash } from "react-icons/fa";

// Animação de entrada
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Container principal do Gerenciador de Projetos
const Container = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.cardColor};
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.cardShadow};
  animation: ${fadeIn} 0.4s ease-out;
  transition: all 0.3s ease-in-out;
  margin: 60px auto 100px auto;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.taskHighlight} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
  background-color: ${({ theme }) => theme.taskHighlight};
  border-radius: 6px;
}

@media (max-width: 768px) {
  width: 95%;
  max-width: 500px;
  margin: 40px auto 80px auto;
}

@media (max-width: 480px) {
  width: 100%;
  max-width: 95%;
  padding: 15px;
  margin: 30px auto 60px auto;
}
`;

const Input = styled.input`
  width: 75%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: 16px;
  background: ${({ theme }) => theme.taskBackground};
  box-shadow: ${({ theme }) => theme.taskShadowInset};
  color: ${({ theme }) => theme.taskText};
  transition: all 0.3s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.taskText};
    opacity: 0.7;
  }

  &:focus {
    box-shadow: ${({ theme }) => theme.taskShadowInsetFocus};
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 14px;
    padding: 10px;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.taskText};
  margin-bottom: 20px;
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.cardColor};
  text-align: center;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const ProjectCard = styled.div`
  margin-top: 25px;
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.cardBackground};
  box-shadow: ${({ theme }) => theme.cardShadow};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: ${({ theme }) => theme.taskHighlight};
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
    color: red;
  }
`;

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");

  const addProject = () => {
    if (projectName.trim()) {
      setProjects([...projects, { title: projectName, id: Date.now(), tasks: [] }]);
      setProjectName("");
    }
  };

  const deleteProject = (projectId) => {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
  };

  const addTaskToProject = (projectId, taskText) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, tasks: [...project.tasks, { text: taskText, completed: false }] }
          : project
      )
    );
  };

  const toggleTask = (projectId, taskId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : project
      )
    );
  };

  const deleteTask = (projectId, taskId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, tasks: project.tasks.filter((task) => task.id !== taskId) }
          : project
      )
    );
  };

  return (
    <Container>
      <Title>Gerenciador de Projetos</Title>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
        <Input
          type="text"
          placeholder="Nome do projeto..."
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Button onClick={addProject} style={{ padding: "12px 20px", fontSize: "1.2rem" }}>
          +
        </Button>
      </div>

      {projects.map((project) => (
        <ProjectCard key={project.id}>
          <DeleteButton onClick={() => deleteProject(project.id)} aria-label="Excluir projeto">
            <FaTrash />
          </DeleteButton>
          <ProjectTitle>{project.title}</ProjectTitle>
          <TaskList
            tasks={project.tasks}
            addTask={(taskText) => addTaskToProject(project.id, taskText)}
            toggleTask={(taskIndex) => toggleTask(project.id, taskIndex)}
            deleteTask={(taskIndex) => deleteTask(project.id, taskIndex)}
          />
        </ProjectCard>
      ))}
    </Container>
  );
};

export default ProjectManager;