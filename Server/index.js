import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);
});

const port = 3000;

app.get("/", (req, res) => res.send("Meridian Live"));
server.listen(port, () => console.log(`app listening on port ${port}!`));
