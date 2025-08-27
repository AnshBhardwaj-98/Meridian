import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const userSocketMap = {};
const roomCodeMap = {};

const getAllConnectedUsers = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId].username,
      };
    }
  );
};

io.on("connection", (socket) => {
  // console.log(`user connected ${socket.id}`);

  socket.on("join", ({ roomId, username }) => {
    socket.join(roomId);
    userSocketMap[socket.id] = { username, roomId };
    const allUsers = getAllConnectedUsers(roomId);
    // console.log(allUsers);

    io.in(roomId).emit("userJoined", {
      userId: socket.id,
      username,
      allUsers,
    });
    if (roomCodeMap[roomId]) {
      socket.emit("codeupdate", { code: roomCodeMap[roomId], typing: null });
    }
  });

  socket.on("codechange", ({ roomId, code, typerSocketId }) => {
    const typing = userSocketMap[typerSocketId].username;
    roomCodeMap[roomId] = code;

    socket.in(roomId).emit("codeupdate", { code, typing });
  });

  socket.on("disconnect", () => {
    const userData = userSocketMap[socket.id];
    if (!userData) return;

    const { username, roomId } = userData;
    const allUsers = getAllConnectedUsers(roomId);
    delete userSocketMap[socket.id];

    io.in(roomId).emit("userLeft", {
      userId: socket.id,
      username,
      allUsers,
    });

    // console.log(`User disconnected: ${username} (${socket.id})`);
  });
});

const port = 3000;

// app.get("/", (req, res) => res.send("Meridian Live"));
server.listen(port, () => console.log(`app listening on port ${port}!`));
