import { Router } from "express";
import { protect } from "../../auth/middleware/authMiddleware.js";
import { isAdmin } from "../../auth/middleware/isAdmin.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

export const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", protect, isAdmin, createProduct);
productRouter.put("/:id", protect, isAdmin, updateProduct);
productRouter.delete("/:id", protect, isAdmin, deleteProduct);