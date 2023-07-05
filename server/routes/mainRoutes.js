import express from "express";
import {
  getOrderController,
  getAllOrdersController,
  newOrderController,
  deleteOrderController,
} from "../controllers/orders.js";
import { verifyToken } from "../middleware/verify.js";

const router = express.Router();

router.get("/order/:id", getOrderController);
router.get("/orders/:username", verifyToken, getAllOrdersController);
router.post("/order", verifyToken, newOrderController);
router.delete("/order/:id", verifyToken, deleteOrderController);

export default router;
