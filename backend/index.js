import path from "path";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

// load env variables from .env file
dotenv.config();

const __dirname = path.resolve();

// parse json request body
app.use(express.json());

// parse cookies
app.use(cookieParser());

const port = process.env.PORT || 5000;

// set up static folder

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// add auth routes
app.use("/api/auth", authRoutes);

// add message routes
app.use("/api/messages", messageRoutes);

// Get User Routes
app.use("/api/users", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
  // connect to database
  connectDB();
  console.log(`Server is running on port ${port}`);
});
