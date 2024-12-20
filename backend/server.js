import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

// Routes
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoute);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});
