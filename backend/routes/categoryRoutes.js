import express from "express";
import { createCategory, getCategories } from "../Controllers/categoryController.js"
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect ,createCategory); 
router.get("/all", getCategories); 

export default router;
