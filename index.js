const express = require("express"); // Importa o Express
const http = require('http');
const socketIo = require('socket.io');

const app = express(); // Cria a aplicação

// Middleware para JSON
app.use(express.json());

// Criar o servidor HTTP
const server = http.createServer(app);

// Configuração do WebSocket
const io = socketIo(server);

// Função para configurar o WebSocket
function setupWebSockets() {
  io.on("connection", (socket) => {
    console.log("Novo cliente conectado");

    // Emitindo uma mensagem para o cliente
    socket.emit("message", "Bem-vindo ao WebSocket");

    // Escutando por mensagem para o cliente
    socket.on("clientMessage", (data) => {
      console.log(data);
    });

    // Quando o cliente fica off
    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
}

// Exporta a função para ser usada no server.js
module.exports = { setupWebSockets, app, server };

// Importar rotas
app.use("/api/auth", require ("./server/routes/auth"));
app.use("/api/protected", require("./server/routes/protected"));


// Rota de teste para verificar se o servidor está rodando
app.get("/", (req, res) => {
  res.send("Servidor rodando com sucesso! API funcionando!");
});