import express from "express";
import {
  createUser,
  emailLoginUser,
  getUser,
} from "../controller/userController.js";
import { authenticate } from "../controller/authController.js";

const router = express.Router();

// router.route("/:id").put(updateUser);
router.post("/", createUser);
router.post("/login", emailLoginUser);
router.get("/me", authenticate, getUser);
export default router;
