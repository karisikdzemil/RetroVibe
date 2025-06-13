import { Server } from "socket.io";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("Socket.io server pokrenut 🚀");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "https://retrovibe-client-cgg1tzxqo-dzemils-projects.vercel.app",
        methods: ["GET", "POST"],
        credentials: true,
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

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
