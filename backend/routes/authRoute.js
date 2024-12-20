import express from "express";
import { forgotPassword, resetPassword, registerUser, loginUser } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser); // Register endpoint
router.post("/login", loginUser);       // Login endpoint

// Forget and Reset Password Endpoints
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

export default router;
