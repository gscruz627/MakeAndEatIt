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
    const { username } = req.params;
    const orders = await Order.find({ owner: username });
    res.status(200).json(orders);
  } catch (reason) {
    res.status(500).json({ reason: "Get All Orders Error, reason: " + reason });
  }
};

export const newOrderController = async (req, res) => {
  try {
    const { name, bun, main, username, toppings, finalStack } = req.body;
    const order = new Order({
      name,
      owner: username,
      bun,
      main,
      toppings,
      finalStack,
    });
    await order.save();
    const orders = await Order.find({owner: username})
    res.status(201).json(orders);
  } catch (reason) {
    res.status(500).json({ reason: "New Order Error, reason: " + reason });
  }
};

export const deleteOrderController = async (req, res) => {
  try {
    const { id, username } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ reason: "Order Not Found" });
    }
    if (username === order.owner) {
      await Order.deleteOne({ _id: id });
      res.status(200);
    } else {
      res.status(403).json({reason: "Non-Author"})
    }
  } catch (reason) {
    res.status(500).json({ reason: "Delete Order Error, reason: " + reason });
  }
};
