import { Router } from "express";
import { register, login, logout } from "../controllers/authControllers.js";

const router = Router();

// LOGIN ROUTE
router.post("/login", login);
// REGISTER ROUTE

router.post("/register", register);

// LOGOUT ROUTE

router.post("/logout", logout);

export default router;
