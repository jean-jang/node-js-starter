import express from "express";
import taskApi from "./taskApi.js";
import userApi from "./userApi.js";

const router = express.Router();

router.use("/task", taskApi);
router.use("/user", userApi);

export default router;
