import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Use the connection string from environment variables (DB_URI)
const dbURI = process.env.DB_URI || "mongodb://localhost:27017/voyager"; // Fallback if DB_URI is not defined

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
