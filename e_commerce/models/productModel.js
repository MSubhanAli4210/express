import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    brand: String,
    category: { type: String, index: true },
    thumbnail: String,
    images: [String],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);