import express from "express";
import router from express.Router();
import taskApi from "./taskApi";  

router.use("/task", taskApi);

export default router;