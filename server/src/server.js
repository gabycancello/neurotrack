require("dotenv").config({ path: require('path').resolve(__dirname, '../../.env') });

const express = require("express");
const http = require('http');
const cors = require("cors");
const path = require("path");
const socketIo = require("socket.io");

const connectDB = require("./config/database");
connectDB();

// Criação do app e servidor
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middlewares
app.use(express.json());
app.use(cors());

// Arquivos estáticos (caso precise futuramente)
const publicPath = path.join(__dirname, '../public');
console.log("Servindo estáticos de:", publicPath);
app.use(express.static(publicPath));

// Configurar rotas
const authRoutes = require("../routes/auth");
const protectedRoutes = require("../routes/protected");
const freelancerRoutes = require("../routes/freelancer");

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/freelancer", freelancerRoutes);

// Rota de teste
app.get('/example', (req, res) => {
  res.json({ message: 'Backend funcionando corretamente!' });
});

// Configurar WebSockets
io.on("connection", (socket) => {
  console.log("Novo cliente conectado");

  socket.emit("message", "Bem-vindo ao WebSocket");

  socket.on("clientMessage", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Tratar erros inesperados
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err.message);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err.message);
  process.exit(1);
});

// Iniciar o servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});