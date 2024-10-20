import express from "express";
import { createUser, emailLoginUser } from "../controller/userController.js";

const router = express.Router();

// router.route("/:id").put(updateUser).delete(deleteUser);

router.post("/", createUser);
router.post("/login", emailLoginUser);

export default router;
