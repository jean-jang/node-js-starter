import User from "../models/User.js";
import bcrypt from "bcrypt";
// Password hashing middleware in src/models/User.js

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
      return res
        .status(400)
        .json({ status: "fail", message: "Passwords doesn't match" });
    }

    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
      throw new Error("User already exists.");
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
    const match = user && (await bcrypt.compare(password, user.password));

    if (!match) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();
    return res.status(200).json({ status: "success", user, token });
  } catch (error) {
    next(error);
  }
};
