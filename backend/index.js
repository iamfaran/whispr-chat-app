import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";

// load env variables from .env file
dotenv.config();

const app = express();

// parse json request body
app.use(express.json());

// parse cookies
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// add auth routes
app.use("/api/auth", authRoutes);

// add message routes
app.use("/api/messages", messageRoutes);

// Get User Routes
app.use("/api/users", userRoutes);

app.listen(port, () => {
  // connect to database
  connectDB();
  console.log(`Server is running on port ${port}`);
});
