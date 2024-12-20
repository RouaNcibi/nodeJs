import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add the name"],
        },
        price: {
            type: Number,
            required: [true, "Please add the product price"],
        },
        image: {
            type: String,
            required: [true, "Please add the image"],
        },
        category: {
            type: String,  
            required: [true, "Please provide a category"]
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
