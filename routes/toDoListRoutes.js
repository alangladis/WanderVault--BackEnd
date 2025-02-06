import express from "express";
import {
  createToDoList,
  getToDoList,
  updateTask,
  deleteTask,
} from "../controllers/toDoListController.js";

const router = express.Router();

// Create a new ToDo List for a trip
router.post("/createToDoList", createToDoList);

// Get ToDo List for a specific trip
router.get("/getToDoList/:tripId", getToDoList);

// Update task completion status
router.put("/updateTask/:tripId/:taskId", updateTask);

// Delete a task from the list
router.delete("/deleteTask/:tripId/:taskId", deleteTask);


export default router;
