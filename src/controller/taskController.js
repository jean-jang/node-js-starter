import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { task, isCompleted } = req.body;
    const newTask = new Task({ task, isCompleted });
    await newTask.save();
    res.status(200).json({ status: "OK", newTask });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).select("-__v");
    res.status(200).json({ status: "OK", tasks });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isCompleted } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, isCompleted },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ status: "OK", updatedTask });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ status: "OK", message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};
