function setupWebSockets(io) {
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
}

module.exports = { setupWebSockets };