import express from "express";
import router from express.Router();

router.post("/", (req, res) => {    
    res.send("New task created");
});

router.get("/", (req, res) => {
    res.send("Get all tasks");
});

router.put("/:id", (req, res) => {
    res.send("Update task");
});

router.delete("/:id", (req, res) => {
    res.send("Delete task");
});

export default router;
