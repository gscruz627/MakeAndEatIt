import express from "express";
import {
  getOrderController,
  getAllOrdersController,
  newOrderController,
  deleteOrderController,
} from "../controllers/orders.js";

const mainRoutes = express.Router();

mainRoutes.get("order/:id", getOrderController);
mainRoutes.get("orders", getAllOrdersController);
mainRoutes.post("order", newOrderController);
mainRoutes.delete("order/:id", deleteOrderController);

export default mainRoutes;
