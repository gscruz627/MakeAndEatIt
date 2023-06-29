import Order from "../models/Order.js";

export const getOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ reason: "Order Not Found" });
    }
    res.status(200).json(order);
  } catch (reason) {
    res.status(500).json({ reason: "Get Order Error, reason: " + reason });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ owner: userId });
    res.status(200).json(orders);
  } catch (reason) {
    res.status(500).json({ reason: "Get All Orders Error, reason: " + reason });
  }
};

export const newOrderController = async (req, res) => {
  try {
    const { bun, main, mainNumber, userId, sides, toppings } = req.body;
    const order = new Order({
      owner: userId,
      bun,
      main,
      mainNumber,
      sides,
      toppings,
    });
    const savedOrder = order.save();
    res.status(201).json(savedOrder);
  } catch (reason) {
    res.status(500).json({ reason: "New Order Error, reason: " + reason });
  }
};

export const deleteOrderController = async (req, res) => {
  try {
    const { id, userId } = req.body;
    const order = await Order.findById(order);
    if (!order) {
      res.status(404).json({ reason: "Order Not Found" });
    }
    if (userId === order.owner) {
      await Order.deleteOne({ _id: id });
      res.status(200);
    }
  } catch (reason) {
    res.status(500).json({ reason: "Delete Order Error, reason: " + reason });
  }
};
