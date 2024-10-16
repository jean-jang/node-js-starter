import express from "express";
import taskApi from "./taskApi.js";

const router = express.Router();

router.use("/task", taskApi);

export default router;
