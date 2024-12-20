import express from "express";
import { 
    getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getProductById,
    searchProducts
} from "../Controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAll/", getProducts); // Public route
router.get("/getById/:id", getProductById); // Public route
router.post("/create", protect, createProduct); // Protected route
router.put("/update/:id", protect, updateProduct); // Protected route
router.delete("/delete/:id", protect, deleteProduct); // Protected route
router.post("/search", searchProducts); //public route

export default router;