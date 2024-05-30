import { Router } from "express";
import { register, login, logout } from "../controllers/authControllers.js";

const router = Router();

// LOGIN ROUTE
router.get("/login", login);
// REGISTER ROUTE

router.get("/register", register);

// LOGOUT ROUTE

router.get("/logout", logout);

export default router;
