import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate("items.product");
    return res.status(200).json({ cart: cart || { items: [] } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.userId });
    if (!cart) cart = await Cart.create({ user: req.userId, items: [] });

    const existingItem = cart.items.find((i) => i.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }

    await cart.save();
    return res.status(200).json({ cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    await cart.save();

    return res.status(200).json({ cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.userId }, { items: [] });
    return res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};