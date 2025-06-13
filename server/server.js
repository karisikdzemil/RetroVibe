const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", (msg) => {
    socket.broadcast.emit("recieve_message", msg);
  });

  socket.on("user_typing", (data) => {
    socket.broadcast.emit("user_typing", data);
  });

  socket.on("new_user", (data) => {
    socket.broadcast.emit("new_user", data.user);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
