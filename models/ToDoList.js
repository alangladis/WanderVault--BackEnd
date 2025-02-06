import mongoose from "mongoose";

// Task Schema for individual tasks
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// ToDoList Schema for a trip
const toDoListSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  tasks: [taskSchema],
});

const ToDoList = mongoose.model("ToDoList", toDoListSchema);

export default ToDoList;
