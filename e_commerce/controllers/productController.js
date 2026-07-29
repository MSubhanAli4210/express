import { Product } from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, price } = req.body;
    if (!title || price === undefined) {
      return res.status(400).json({ message: "Title and price are required" });
    }

    const product = await Product.create(req.body);
    return res.status(201).json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};