import { Router } from "express";
import { protect } from "../../auth/middleware/authMiddleware.js";
import { isAdmin } from "../../auth/middleware/isAdmin.js";
import {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";

export const orderRouter = Router();

orderRouter.use(protect);

orderRouter.post("/", createOrder);
orderRouter.get("/", getMyOrders);
orderRouter.patch("/:id/cancel", cancelOrder);           
orderRouter.patch("/:id/status", isAdmin, updateOrderStatus);
