# NeuroTrack
<br>

*NeuroTrack* é uma plataforma full stack para gerenciamento de freelancers, tarefas e projetos. Criada com foco em escalabilidade, segurança e experiência do usuário.

<br>

[*Acesse a versão online do projeto aqui*](https://neurotrack-frontend.onrender.com)

---
<br>

## Visão Geral
<br>

> O NeuroTrack nasceu para simplificar a organização de tarefas em ambientes colaborativos.  
> Seu diferencial está na junção entre funcionalidade, performance e um design suave e moderno.  
> A interface neomórfica, os testes de API no Insomnia e a estrutura escalável tornam essa aplicação pronta para crescer.

---
<br>

## Tecnologias Utilizadas
<br>

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- Axios para requisições HTTP
- Estilização com CSS moderno e componentes modulares
- UI com inspiração *Neumorphism Design*

<br>
<br>

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- Autenticação com JWT
- Middlewares personalizados
- Arquitetura MVC

### Testes
<br>
- [Insomnia](https://insomnia.rest/) para testes das rotas e autenticação
<br>

> Exemplo de requisição testada no Insomnia:
<br>

![Testes de API no Insomnia](./client/src/assets/Insomnia.png)

---

## Funcionalidades

- Cadastro e login com autenticação JWT
- Registro e gerenciamento de freelancers
- Criação e visualização de tarefas
- Interface responsiva e com foco em UX
- Comunicação com o backend via API segura
- Feedback visual e modais interativos

---

## Como rodar localmente
<br>

### Pré-requisitos

<br>

- Node.js e npm instalados
- MongoDB (pode ser local ou Atlas)

### Clonar o projeto

<br>

git clone https://github.com/gabycancello/neurotrack.git
cd neurotrack

---

### Rodando o Backend

<br>

cd server
npm install
npm run dev

<br>

Crie um arquivo .env com:
<br>

MONGO_URI=seu_link_mongodb
JWT_SECRET=sua_chave_secreta
<br>

### Rodando o Frontend

<br>

cd client
npm install
npm run dev

<br>

Crie um .env com:
<br>

VITE_API_URL=http://localhost:5000

---

<br>
<br>

## Deploy

•	Frontend: neurotrack-frontend.onrender.com
<br>
•	Backend: neurotrack-backend.onrender.com

<br>
<br>

## Inspiração no Design Neomórfico

<br>

O projeto utiliza um layout inspirado no Neumorphism, buscando:
<br>
	•	Sombras suaves e relevos sutis
 <br>
	•	Botões e cards com estética clean
 <br>
	•	Interface com foco na suavidade da interação

 <br>
 <br>

 # Contato
 <br>

 Desenvolvido por Gabriela Cancello
