import express from "express";
import { registerUser } from "../controllers/register.js";
import { loginUser } from "../controllers/login.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;