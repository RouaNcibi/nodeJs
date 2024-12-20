import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the category name"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please add a category description"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
