import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";

const router = express.Router();

router.route("/").post(createTask).get(getTasks);
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;
