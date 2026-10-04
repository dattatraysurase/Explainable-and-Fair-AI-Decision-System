import express from "express";
import { registerUser } from "../controllers/register.js";
import { loginUser } from "../controllers/login.js";
import { getProfile } from "../controllers/profile.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",authMiddleware,getProfile);

export default router;