import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const authenticate = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error("Can't take token");
    }
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, SECRET_KEY, (error, payload) => {
      if (error) {
        return res
          .status(401)
          .json({ status: "fail", message: "Invalid token" });
      }
      req.userId = payload._id;
      next();
    });
  } catch (error) {
    next(error);
  }
};
