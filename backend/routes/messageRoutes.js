import express from "express";
import { sendMessage } from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Before running sendMessage
// we need to check if the user is authenticated
// we will use a middleware to do this

router.post("/send/:id", protectRoute, sendMessage);

export default router;
