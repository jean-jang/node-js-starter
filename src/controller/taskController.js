import Task from "../models/Task.js";

export const createTask = async (req, res, next) => {
  try {
    const { task, isCompleted } = req.body;
    const newTask = new Task({ task, isCompleted });
    await newTask.save();
    res.status(200).json({ status: "ok", newTask });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ status: "OK", tasks });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
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
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ status: "OK", message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
