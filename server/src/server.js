require("dotenv").config({ path: require('path').resolve(__dirname, '../../.env')});
console.log("URI do MongoDB:", process.env.MONGO_URI);

const connectDB = require("./config/database");
connectDB();

const express = require("express");
const cors = require("cors");
const path = require('path');
const { setupWebSockets, app, server } = require("../../index");
const freelancerRoutes = require("../routes/freelancer");

// Middlewares
app.use(express.json());
app.use(cors());

const publicPath = path.join(__dirname, '../public');
console.log("Servindo estáticos de:", publicPath);
app.use(express.static(publicPath));

// Endpoint de teste
app.get('/example', (req, res) => {
  res.json({ message: 'Backend funcionando corretamente!'});
})

// Importação de rotas
const authRoutes = require("../routes/auth");  // Rotas de autenticação
const protectedRoutes = require("../routes/protected");  // Rotas protegidas

// Definindo as rotas
app.use("/api/auth", authRoutes);  // Rotas de autenticação
app.use("/api/protected", protectedRoutes);  // Rotas protegidas
app.use("/api/freelancer", freelancerRoutes); // Rotas dos freelancers

// Configuração do WebSocket
setupWebSockets();

// Define a porta e inicia o servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});