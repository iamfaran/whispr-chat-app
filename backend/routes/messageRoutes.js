import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Before running sendMessage
// we need to check if the user is authenticated
// we will use a middleware to do this

router.post("/send/:id", protectRoute, sendMessage);

// GET /api/messages/:id

router.get("/:id", protectRoute, getMessages);

export default router;
