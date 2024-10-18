import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
