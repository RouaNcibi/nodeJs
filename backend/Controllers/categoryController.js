import Category from "../models/categoryModel.js"; 


// Create a new category
export const createCategory = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ success: false, message: "Please provide both name and description" });
    }
    try {
        const newCategory = new Category({ name, description });
        await newCategory.save();

        res.status(201).json({
            success: true,
            data: newCategory,
            user: req.user, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get all categories
export const getCategories = async (req, res) => {
    try {
      const categories = await Category.find({});
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
