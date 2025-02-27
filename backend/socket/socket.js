import { Server } from "socket.io";
import dotenv from "dotenv";

import http from "http";
import express from "express";

dotenv.config();

const app = express();
const server = http.createServer(app);
const isDevelopment = process.env.NODE_ENV === "development";
const orgin = isDevelopment
  ? "http://localhost:3000"
  : "https://whispr-chat-app.onrender.com/";
const io = new Server(server, {
  cors: {
    origin: orgin,
    methods: ["GET", "POST"],
  },
});

let onlineUsers = {};

export const getReceiverSocketId = (receiverId) => {
  return onlineUsers[receiverId];
};

io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);

  socket.on("userConnected", ({ userId }) => {
    console.log("user connected", userId);
    onlineUsers[userId] = socket.id;

    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  // socket.on() is used to listen for events. Can be used for both server and client.
  socket.on("disconnect", () => {
    const userId = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id
    );
    delete onlineUsers[userId];
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  // socket.on() for startTyping event
  socket.on("startTyping", ({ recipientId, senderId }) => {
    const receiverSocketId = getReceiverSocketId(recipientId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userTyping", { senderId });
    }
  });

  // socket.on() for stopTyping event
  socket.on("stopTyping", ({ recipientId, senderId }) => {
    const receiverSocketId = getReceiverSocketId(recipientId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userTypingStop", { senderId });
    }
  });
});

export { io, app, server };
