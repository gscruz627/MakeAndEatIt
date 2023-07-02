import express from "express";
import {
  getOrderController,
  getAllOrdersController,
  newOrderController,
  deleteOrderController,
} from "../controllers/orders.js";

const router = express.Router();

router.get("order/:id", getOrderController);
router.get("orders", getAllOrdersController);
router.post("order", newOrderController);
router.delete("order/:id", deleteOrderController);

export default router;
