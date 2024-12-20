import mongoose from "mongoose";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

// Get all products
export const getProducts = async (req, res) => {
    try {
      const products = await Product.find({}).populate("category", "name description");
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

// Get Product by ID
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error in getting product by ID:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


// Create a new product
export const createProduct = async (req, res) => {
    const { name, price, image, categoryName } = req.body;  // categoryName instead of category ID

    if (!name || !price || !image || !categoryName) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
    
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(400).json({ success: false, message: "Category not found" });
        }

    
        const newProduct = new Product({
            name,
            price,
            image,
            category: category._id,  
        });

    
        await newProduct.save();

        const user = req.user;

        res.status(201).json({
            success: true,
            data: {
                ...newProduct.toObject(),
                category: category.name,  
            },
            user: user, 
            category: category.name, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};





// Update an existing product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image, categoryName } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        let categoryId;
        if (categoryName) {
            const category = await Category.findOne({ name: categoryName });
            if (!category) {
                return res.status(400).json({ success: false, message: "Category not found" });
            }
            categoryId = category._id; 
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, 
            {
                name,
                price,
                image,
                category: categoryId || undefined, 
            }, 
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const user = req.user;

        res.status(200).json({
            success: true,
            data: {
                ...updatedProduct.toObject(),
                category: categoryId ? (await Category.findById(categoryId)).name : undefined, 
            },
            user: user, 
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Search Products 
export const searchProducts = async (req, res) => {
    const { name, price, category } = req.body; // Extract name, price, and category from the request body

    try {
        // Build the search query dynamically
        let query = {};

        // Search by name if provided
        if (name) {
            query.name = { $regex: name, $options: "i" }; // Case-insensitive name search
        }

        // Search by price if provided
        if (price) {
            query.price = price; // Exact price match
        }

        // Search by category if provided
        if (category) {
            // Case-insensitive search for category
            query.category = { $regex: new RegExp(`^${category}$`, "i") }; // Match category exactly (ignoring case)
        }

        // Log the query to verify it
        console.log("Search Query: ", query);

        // Fetch products based on the query
        const products = await Product.find(query);

        // Check if any products are found
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found" });
        }

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error searching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


