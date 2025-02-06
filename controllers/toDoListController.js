import ToDoList from "../models/ToDoList.js";
import mongoose from 'mongoose'
// Create a new ToDo List for a trip
export const createToDoList = async (req, res) => {
  const { tripId, tasks } = req.body;

  try {
    const newToDoList = new ToDoList({
      tripId,
      tasks,
    });

    await newToDoList.save();
    res.status(201).json(newToDoList); // Return the created to-do list
  } catch (error) {
    res.status(500).json({ message: "Error creating to-do list", error });
  }
};

// Get ToDo List for a specific trip
export const getToDoList = async (req, res) => {
  try {
    const { tripId } = req.params; // Extract tripId from the request params (URL)

    const toDoLists = await ToDoList.find({ tripId }); // Query using the tripId
    if (!toDoLists || toDoLists.length === 0) {
      return res
        .status(404)
        .json({ message: "To-Do List not found for this trip" });
    }

    res.status(200).json(toDoLists); // Return the found to-do lists
  } catch (error) {
    res.status(500).json({ message: "Error fetching to-do list", error });
  }
};



export const updateTask = async (req, res) => {
  try {
    const { tripId, taskId } = req.params;
    const { completed } = req.body;


    // Ensure tripId and taskId are valid ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(tripId) ||
      !mongoose.Types.ObjectId.isValid(taskId)
    ) {
      return res.status(400).json({ message: "Invalid tripId or taskId" });
    }

    // Convert to ObjectId correctly using 'new'
    const tripObjectId = new mongoose.Types.ObjectId(tripId);
    const taskObjectId = new mongoose.Types.ObjectId(taskId);

    // Find the to-do list for the given tripId and taskId
    const toDoList = await ToDoList.findOne({
      tripId: tripObjectId,
      "tasks._id": taskObjectId,
    });

    if (!toDoList) {
      return res
        .status(404)
        .json({ message: "To-Do List or Task not found for this trip" });
    }

    // Find the task index in the tasks array
    const taskIndex = toDoList.tasks.findIndex(
      (task) => task._id.toString() === taskObjectId.toString() // Compare as string after conversion
    );

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ✅ Only update 'completed' status
    toDoList.tasks[taskIndex].completed = completed;

    // Save updated to-do list
    await toDoList.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: toDoList.tasks[taskIndex],
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message || error });
  }
};




// Delete a task from a specific to-do list document
export const deleteTask = async (req, res) => {
  const { tripId, taskId } = req.params;

  try {
    // Find the to-do list that matches the tripId and taskId
    const toDoList = await ToDoList.findOne({ 'tasks._id': taskId, tripId });

    if (!toDoList) {
      return res
        .status(404)
        .json({ message: "To-Do List or Task not found for this trip" });
    }

    // Find the task index by taskId
    const taskIndex = toDoList.tasks.findIndex(
      (task) => task._id.toString() === taskId
    );

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Remove the task from the tasks array
    toDoList.tasks.splice(taskIndex, 1);

    // Save the updated to-do list
    await toDoList.save();

    res.status(200).json({
      message: "Task deleted successfully",
      tasks: toDoList.tasks,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task", error: error.message || error });
  }
};
