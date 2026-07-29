import { Router } from "express";
import { protect } from "../../auth/middleware/authMiddleware.js";
import { getCart, addToCart, removeFromCart, clearCart } from "../controllers/cartController.js";

export const cartRouter = Router();

cartRouter.use(protect);
cartRouter.get("/", getCart);
cartRouter.post("/", addToCart);
cartRouter.delete("/:productId", removeFromCart);
cartRouter.delete("/", clearCart);