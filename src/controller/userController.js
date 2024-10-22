import { json } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
// Password hashing middleware in src/models/User.js

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: "fail", message: "Passwords doesn't match" });
    }

    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(400).json({
        status: "fail",
        message: "This account already in use",
      });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

export const emailLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "No account found with these details",
      });
    }

    const match = user && (await bcrypt.compare(password, user.password));

    if (!match) {
      return res
        .status(400)
        .json({ status: "fail", message: "Incorrect email or password" });
    }

    const token = await user.generateAuthToken();
    return res.status(200).json({ status: "success", user, token });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ status: "fail", message: "User unavailable" });
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    next(error);
  }
};
