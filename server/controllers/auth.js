import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const alreadyExists = await User.findOne({ username: username });
    if (alreadyExists) {
      res.status(400).json({ reason: "User Already Exists" });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        username,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      const savedUser = await user.save();
      res.status(201).json({ user: savedUser, token: token });
    }
  } catch (reason) {
    res.status(500).json({ reason: "Register error, reason: " + reason });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    console.log(user);
    if (!user) {
      res.status(401).json({ reason: "Autherror, no user" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      const savedUser = await user.save();
      return res.status(200).json({ user: savedUser, token: token });
    } else {
      res.status(401).json({ reason: "Autherror, no match" });
      return;
    }
  } catch (reason) {
    res.status(500).json({ reason: "Login error, reason: " + reason });
  }
};
