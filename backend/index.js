import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./db/connectDB.js";

// load env variables from .env file
dotenv.config();

const app = express();

// parse json request body
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// add auth routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  // connect to database
  connectDB();
  console.log(`Server is running on port ${port}`);
});
