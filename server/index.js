import express from "express";
import cors from "cors";
import connectdb from "./db/MongoConnect.js";
import userRoute from "./Routes/userRoute.js";
import msgRoute from "./Routes/messageRoue.js";
import { Server } from "socket.io";
import { createServer } from "http";
const app = express();
const server = createServer(app);
const port = 5000;
app.use(cors());
app.use(express.json());
console.clear();
app.use("/api/auth", userRoute);
app.use("/api/message", msgRoute);
connectdb();
server.listen(port, () => {
  console.log("server is listening on port", port);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  // console.log("a user connected");
  global.chatSocket = socket;
  socket.on("add-user", (user) => {
    onlineUsers.set(user.id, socket.id);
    // console.log(onlineUsers);
  });
  socket.on("send-msg", (data) => {
    const senduserSocket = onlineUsers.get(data.to);
    // console.log(senduserSocket);
    // console.log(data);
    if (senduserSocket) {
      socket.to(senduserSocket).emit("msg-receive", data.message);
    }
  });
});
