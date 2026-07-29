import mongoose from "mongoose";
import axios from "axios";
import "dotenv/config";
import { Product } from "../models/productModel.js";

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    console.log("Fetching products from dummyjson...");
    const { data } = await axios.get("https://dummyjson.com/products?limit=100");

    const products = data.products.map((p) => ({
      title: p.title,
      description: p.description,
      price: p.price,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      stock: p.stock,
      brand: p.brand,
      category: p.category,
      thumbnail: p.thumbnail,
      images: p.images,
    }));

    console.log("Clearing existing products...");
    await Product.deleteMany({});

    console.log(`Inserting ${products.length} products...`);
    await Product.insertMany(products);

    console.log("Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
};

seedProducts();