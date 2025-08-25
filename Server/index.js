import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("join", ({ roomId, username }) => {
    socket.join(roomId);
    userSocketMap[socket.id] = { username, roomId };
    socket.to(roomId).emit("userJoined", {
      userId: socket.id,
      username,
    });
    console.log(userSocketMap);
  });

  socket.on("disconnect", () => {
    const userData = userSocketMap[socket.id];
    if (!userData) return;

    const { username, roomId } = userData;

    // Remove from map
    delete userSocketMap[socket.id];

    // Notify remaining users in the room
    socket.to(roomId).emit("userLeft", {
      userId: socket.id,
      username,
    });

    console.log(userSocketMap);

    console.log(`User disconnected: ${username} (${socket.id})`);
  });
});

const port = 3000;

app.get("/", (req, res) => res.send("Meridian Live"));
server.listen(port, () => console.log(`app listening on port ${port}!`));
