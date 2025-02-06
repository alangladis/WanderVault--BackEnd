import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import tripRoutes from "./routes/tripRoutes.js"; // Import your trip routes file
import expenseRoutes from "./routes/expenseRoutes.js";
import toDoListRoutes from "./routes/toDoListRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Use the trip routes
app.use("/api", tripRoutes); // All your trip routes will be under /api (e.g., /api/trips)
app.use("/api/expenses", expenseRoutes); // Expense routes
app.use("/api/todolist", toDoListRoutes);
app.use("/api/auth", authRoutes);
// Connect to MongoDB (make sure MongoDB is running)
mongoose
  .connect("mongodb://localhost:27017/voyager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Start the server
app.listen(3031, () => {
  console.log("Server running on http://localhost:3031");
});
