import React, { useState } from 'react';
import Modal from 'react-modal';
import Card from './components/Card';
import Button from './components/Button';
import TaskList from './components/TaskList';
import ProjectManager from './components/ProjectManager';
import FreelaForm from './components/FreelaForm';
import FreelaList from './components/FreelaList';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

Modal.setAppElement('#root');

const lightTheme = {
  background: "linear-gradient(145deg, #f0f0f0, #e0e0e0)",
  color: "#333",
  cardBackground: "#e0e0e0",
  cardColor: "#333",
  cardShadow: "6px 6px 12px #bebebe, -6px -6px 12px #ffffff",
  cardShadowHover: "insert 5px 5px 9px #bebebe, inset -5px -5px 9px #ffffff",
  taskBackground: "#e0e0e0",
  taskText: "#333",
  taskShadow: "8px 8px 16px #bebebe, -8px -8px 16px #ffffff",
  taskShadowInset: "inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff",
  taskShadowInsetFocus: "inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff",
  taskHighlight: "#4caf50"
};

const darkTheme = {
  background: "linear-gradient(145deg, #1a1a1a, #252525)",
  color: "#ffffff",
  cardBackground: "#252525",
  cardColor: "#ddd",
  cardShadow: "6px 6px 12px #1a1a1a, -6px -6px 12px #2e2e2e",
  cardShadowHover: "inset 5px 5px 9px #1a1a1a, inset -5px -5px 9px #2e2e2e",
  taskBackground: "#2a2a2a",
  taskText: "#fff",
  taskShadow: "8px 8px 16px #1a1a1a, -8px -8px 16px #3a3a3a",
  taskShadowInset: "inset 5px 5px 10px #1a1a1a, inset -5px -5px 10px #3a3a3a",
  taskShadowInsetFocus: "inset 3px 3px 6px #1a1a1a, inset -3px -3px 6px #3a3a3a",
  taskHighlight: "#4caf50"
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    background: ${({ theme }) => theme.taskBackground};
    color: ${({ theme }) => theme.taskText};
    font-family: 'Roboto', sans-serif;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  }
`;

const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 100px 20px;
  min-height: 100vh;
  width: 100vw;
  gap: 20px;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [isFreelaModalOpen, setIsFreelaModalOpen] = useState(false); 

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const addFreelancer = (freelancer) => {
    setFreelancers((prev) => [...prev, freelancer]);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <PageWrapper>
        <AppContainer>
          <Button label="Toggle Dark Mode" onClick={toggleDarkMode} />
          <Card title="Freelancer Task" description="Complete sua primeira tarefa!" />
          <TaskList
            tasks={tasks}
            addTask={addTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
          <ProjectManager />
          <FreelaList />
          {/* Formulário modal renderizado com estado de controle */}
          <FreelaForm
            isOpen={isFreelaModalOpen}
            onRequestClose={() => setIsFreelaModalOpen(false)}
            onSubmit={addFreelancer}
          />
        </AppContainer>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default App;